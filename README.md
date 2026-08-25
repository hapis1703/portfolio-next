# portfolio-next

Personal portfolio of Ahmad Hafizh ([@hapis1703](https://github.com/hapis1703)) - live at [hepiss.my.id](https://hepiss.my.id).

Rebuilt from the original Vite + React SPA into a server-rendered Next.js app, with a proper theme system and secrets that stay on the server.

## Features

- **Multi-page** - Home, Projects, Skills, About, Contact, Donate, Themes, plus a custom 404
- **Theme system** - 6 accent palettes (Modern, Sunset, Neon, Ocean, Forest, Mono) x light/dark mode = 12 combinations. Persisted in `localStorage`, applied before hydration so there is no flash on load
- **Live GitHub data** - pinned and recently pushed repos fetched server-side with ISR (1 hour cache) and static fallbacks when the API is unreachable
- **Contact form** - delivered to a Discord webhook through a server route, with validation and rate-friendly error handling
- **QRIS donations** - payment links generated via the [buatqris](https://api.buatqris.site) API, proxied through server routes so the secret token never reaches the browser
- **Motion with manners** - scroll reveals, marquee, and a cursor glow, all honoring `prefers-reduced-motion`

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Styling | Tailwind CSS v4, CSS custom properties for theming |
| Animation | Motion |
| Icons | Tabler Icons |
| Fonts | Outfit + JetBrains Mono via `next/font` |

## Getting started

```bash
git clone https://github.com/hapis1703/portfolio-next.git
cd portfolio-next
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open http://localhost:3000.

> On Termux / android-arm64 the scripts already use `--webpack` because Turbopack has no native binding for this platform. On other platforms you can drop the flag.

### Environment variables

| Variable | Purpose |
|---|---|
| `DISCORD_WEBHOOK_URL` | Discord webhook that receives contact form messages |
| `BUATQRIS_BASE_URL` | QRIS payment API base URL |
| `BUATQRIS_ACCOUNT_ID` | buatqris account id |
| `BUATQRIS_SECRET_TOKEN` | buatqris secret token |

All variables are **server-only**. None use the `NEXT_PUBLIC_` prefix, so nothing leaks into the client bundle.

## Project structure

```
app/
  page.jsx               # home: hero, marquee, pinned repos, CTA
  projects/              # recently pushed repos
  skills/                # grouped skill pills
  about/                 # timeline + off-keyboard section
  contact/               # form + direct links
  donate/                # QRIS donation flow
  themes/                # interactive theme picker
  api/contact            # POST -> Discord webhook
  api/donate/create      # POST -> QRIS string + image
  api/donate/status      # POST -> payment status check
components/              # client islands ("use client") + shared blocks
lib/data.js              # all editable copy in one place
lib/github.js            # GitHub REST fetching, ISR + fallbacks
```

## Deployment

Any Node host works (Vercel, Railway, a VPS):

```bash
npm run build
npm run start
```

Set the four environment variables on the host and it is ready.
