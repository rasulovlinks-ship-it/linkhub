import domains from "./data/domains.json";

/**
 * Serves the static export from ASSETS. The only custom behavior: when a
 * request's Host header matches a customer's mapped custom domain, the
 * site's page is served at that domain's root ("/") instead of the
 * marketing homepage.
 */
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = (request.headers.get("host") ?? url.hostname)
			.toLowerCase()
			.replace(/^www\./, "")
			.split(":")[0];
		const slug = domains[host];

		if (slug && url.pathname === "/") {
			const assetUrl = new URL(url);
			assetUrl.pathname = `/s/${slug}`;
			return env.ASSETS.fetch(new Request(assetUrl, request));
		}

		return env.ASSETS.fetch(request);
	},
};
