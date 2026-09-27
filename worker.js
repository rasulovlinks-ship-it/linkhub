import domains from "./data/domains.json";

/**
 * Serves the static export from ASSETS. Any host that is not a customer
 * domain (ownlink.uz, workers.dev) gets the whole site.
 *
 * A customer domain (data/domains.json) is locked to that customer's site.
 * Its value is a slug, or a list of slugs when the customer has several
 * versions: "/" serves the first, "/2", "/3", ... the following ones. The
 * pages' own files and shared build assets pass through, and every other
 * path (the ownlink.uz homepage, /ru, other clients' sites) redirects back
 * to the domain's root.
 */
function isAllowedOnClientDomain(pathname, slugs) {
	return (
		pathname.startsWith("/_next/") ||
		pathname === "/favicon.ico" ||
		slugs.some(
			(slug) =>
				pathname.startsWith(`/sites/${slug}/`) ||
				pathname.startsWith(`/s/${slug}/`),
		)
	);
}

/** "/" -> first slug, "/2" -> second slug, ...; null for any other path */
function slugForPath(pathname, slugs) {
	if (pathname === "/") return slugs[0];
	const n = /^\/(\d+)\/?$/.exec(pathname)?.[1];
	return n && n !== "1" ? (slugs[Number(n) - 1] ?? null) : null;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Plain http shows "Not secure" in the browser; send everyone to https
		// (except local `wrangler dev`, which only speaks http).
		if (url.protocol === "http:" && !/^(localhost|127\.0\.0\.1)$/.test(url.hostname)) {
			url.protocol = "https:";
			return Response.redirect(url.toString(), 301);
		}

		const host = (request.headers.get("host") ?? url.hostname)
			.toLowerCase()
			.replace(/^www\./, "")
			.split(":")[0];
		const entry = domains[host];

		// Search-engine verification files (public/yandex_*.html, google*.html)
		// must answer 200 at their exact .html path; the asset server would
		// 307 them to the extensionless path, so fetch that directly.
		if (/^\/(yandex_[0-9a-f]+|google[0-9a-f]+)\.html$/.test(url.pathname)) {
			const assetUrl = new URL(url);
			assetUrl.pathname = url.pathname.slice(0, -".html".length);
			return env.ASSETS.fetch(new Request(assetUrl, request));
		}

		if (!entry) return env.ASSETS.fetch(request);

		const slugs = [].concat(entry);
		const origin = `https://${host}`;

		// The build's robots.txt / sitemap.xml describe ownlink.uz, so each
		// customer domain gets its own, listing its "/", "/2", ... pages.
		if (url.pathname === "/robots.txt") {
			return new Response(
				`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
				{ headers: { "content-type": "text/plain; charset=utf-8" } },
			);
		}
		if (url.pathname === "/sitemap.xml") {
			const locs = slugs
				.map((_, i) => `<url><loc>${origin}/${i ? i + 1 : ""}</loc></url>`)
				.join("");
			return new Response(
				`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locs}</urlset>\n`,
				{ headers: { "content-type": "application/xml; charset=utf-8" } },
			);
		}

		const slug = slugForPath(url.pathname, slugs);

		if (slug) {
			const assetUrl = new URL(url);
			assetUrl.pathname = `/s/${slug}`;
			return env.ASSETS.fetch(new Request(assetUrl, request));
		}

		if (isAllowedOnClientDomain(url.pathname, slugs)) {
			return env.ASSETS.fetch(request);
		}

		return Response.redirect(new URL("/", url).toString(), 302);
	},
};
