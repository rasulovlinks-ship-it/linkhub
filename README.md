# ownlink.uz

A Taplink alternative for Uzbekistan: instead of `taplink.cc/username`, each
client gets their own cheap `.uz` domain (e.g. `thebestcakestashkent.uz`)
pointing at a clean link-in-bio page with their Telegram, Instagram, YouTube,
WhatsApp, phone, and location links.

No accounts, no dashboard — you (the operator) manage every client's page as
a small JSON file. This keeps the product dead simple and cheap to run.

## How it works

- One Next.js app is deployed once (e.g. on Vercel).
- Every client's content lives in `data/sites/<slug>.json`.
- `data/domains.json` maps a real domain (e.g. `thebestcakestashkent.uz`) to
  a slug (e.g. `thebestcakestashkent`).
- When someone visits a connected domain, the app reads the `Host` header,
  looks it up in `data/domains.json`, and renders that client's page.
- Every site is also always reachable at `/s/<slug>` on the main deployment
  URL — handy for building/previewing a client's page before their domain
  is even connected yet.

## Adding a new client

1. Copy `data/sites/demo.json` to `data/sites/<new-slug>.json` and fill in
   their name, bio, avatar, theme colors, and links.
2. Add an entry to `data/domains.json`:
   ```json
   { "clientdomain.uz": "new-slug" }
   ```
   To show several versions on one domain, use a list:
   `"clientdomain.uz": ["slug", "slug-2", "slug-3"]` serves them at `/`,
   `/2` and `/3`. A client domain shows only its own pages; any other path
   redirects to its root.
3. Commit + redeploy (or just push — Vercel redeploys on push automatically).
4. Preview it immediately at `https://<your-deployment>/s/new-slug` even
   before the domain is connected.
5. Connect the domain (see below).

### Link types supported

`telegram`, `instagram`, `youtube`, `whatsapp`, `phone`, `location`,
`website`, `custom` — each gets a matching icon automatically. See
`lib/types.ts` for the schema.

## Connecting a client's `.uz` domain

Once a client buys their domain (~$3/year from a local Uzbek registrar):

1. In your hosting provider (e.g. Vercel dashboard → your project →
   Settings → Domains), add their domain, e.g. `thebestcakestashkent.uz`.
2. The host will show you DNS records to set. Typically:
   - Root domain (`thebestcakestashkent.uz`): an **A record** pointing to
     the host's IP (Vercel: `76.76.21.21`).
   - `www` subdomain: a **CNAME record** pointing to the host's target
     (Vercel: `cname.vercel-dns.com`).
3. The client (or you, if you manage their registrar account) adds those
   records in their domain's DNS panel.
4. DNS propagation usually takes a few minutes to a few hours.
5. Make sure `data/domains.json` has an entry mapping that exact domain to
   the right slug, then redeploy.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/s/demo` to see the example page, or
`http://localhost:3000/s/thebestcakestashkent` for the cake-shop example.

## Deploying

The easiest option is [Vercel](https://vercel.com) (free tier is enough to
start): connect this repo, deploy, then add each client domain under
Project → Settings → Domains as described above.

## Photo templates: attaching the owner's own cakes

The plain templates `grid`, `slider` and `intro` (demos: `/s/grid-template`,
`/s/slider-template`, `/s/intro-template`) are built around the owner's real
photos. To use a client's photos:

1. Put the files in `public/sites/<slug>/` (WebP or JPG, about 900 px on the
   long side, under 150 KB each).
2. In `data/sites/<slug>.json` point each photo slot at its file:
   `{ "id": "p1", "photoUrl": "/sites/<slug>/cake1.webp", "caption": { "uz": "...", "ru": "..." } }`.
   The caption is optional. A slot with no `photoUrl` shows a drawn cake
   (`"sketch": { "kind": "round", "color": "#ff8fb8" }`) or an empty tint.
3. `avatarUrl` is the round logo or photo on `grid`; `intro.portraitUrl` is the
   owner's portrait on `intro` (a drawn baker is shown until it is set).
4. Counters on `intro` are plain numbers (`"value": 10000, "suffix": "+"`).

The demo photos in `public/sites/cake-demo/` are CC0 (see `SOURCES.txt`).
