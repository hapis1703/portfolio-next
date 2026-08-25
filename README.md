# hafizh.dev

Personal portfolio of Ahmad Hafizh ([@hapis1703](https://github.com/hapis1703)), built with Next.js.

**Live:** [hepiss.my.id](https://hepiss.my.id)

## Stack

- **Next.js 16** (App Router, Server Components)
- **Tailwind CSS v4** (CSS-first config, token-driven theming)
- **Motion** for animation
- **@tabler/icons-react**
- Fonts: Outfit + JetBrains Mono via `next/font`

## Features

- Multi-page: Home, Projects, Skills, About, Contact, Donate, Themes
- 6 accent themes x light/dark mode, persisted in `localStorage`, no flash on load
- Live GitHub data (pinned + recent repos) with graceful fallbacks
- Contact form delivering to a Discord webhook via a server route
- QRIS donations through the buatqris API, proxied server-side so the secret token never reaches the browser

## Getting started

```bash
npm install
cp .env.example .env   # fill in the values
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Purpose |
|---|---|
| `DISCORD_WEBHOOK_URL` | Webhook that receives contact form messages |
| `BUATQRIS_BASE_URL` | QRIS payment API base URL |
| `BUATQRIS_ACCOUNT_ID` | buatqris account id |
| `BUATQRIS_SECRET_TOKEN` | buatqris secret token |

All of these are server-only; none are exposed to the client bundle.

## Project structure

```
app/            # App Router pages + API routes
components/     # UI components (client islands marked "use client")
lib/data.js     # site content and copy
lib/github.js   # GitHub REST fetching with ISR caching
```
