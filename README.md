<div align="center">

# ADITYA CREATES
### DIGITAL PRODUCTS × STOREFRONT — 2026

![Store](https://img.shields.io/badge/ADITYA%20CREATES-DIGITAL%20STOREFRONT-%23F2F0EB?style=for-the-badge&labelColor=%23060608)
![Status](https://img.shields.io/badge/STATUS-LIVE-%237A1212?style=for-the-badge&labelColor=%23060608)
![Stack](https://img.shields.io/badge/NEXT.JS%2016-REACT%2019%20%2F%20TYPESCRIPT-%23060608?style=for-the-badge&labelColor=%23060608)
![License](https://img.shields.io/badge/License-MIT-%23060608?style=for-the-badge&labelColor=%23060608)

**Premium digital assets for creators — reel bundles, templates, courses, eBooks, presets, and more**

[Live Store](https://adityacreates.com) • [Mirror](https://aditya-crates.vercel.app) • [GitHub](https://github.com/adityapratap0077-cloud/Aditya-crates)

</div>

---

## What It Is

Aditya Creates is a full digital-products storefront — a concept commerce experience for creator-focused digital assets. The storefront ships with a built-in catalogue of **46 products across 11 categories**: Reel Bundles, Canva Templates, Courses, eBooks, Lightroom Presets, AI Prompts, Stock Photos, Audio Packs, Infographics, Slide Shows, and Notes.

## Stack

`Next.js 16` `React 19` `TypeScript` `Tailwind CSS 4` `Framer Motion` `lucide-react` `canvas-confetti`

---

## Features

- **Scrollytelling Hero** — scroll-driven cinematic hero sequence with a glass scrollytelling overlay
- **Full Catalogue** — 46 products, 11 categories, individual product pages with ratings and reviews
- **Search Overlay** — instant catalogue search, wired through JSON-LD search actions
- **Cart + Checkout Flow** — slide-in cart sidebar ending on a success page with confetti
- **Auth Modal** — email and Google sign-in options, session persisted locally
- **Admin Panel** — add, edit, and delete products (auth-gated, context-driven)
- **User Dashboard** — personal library of owned products
- **Social Proof** — product reviews section, "Trusted by Creators" band, creator profile
- **SEO Built-In** — JSON-LD structured data, sitemap, robots, PWA manifest

---

## Architecture

```
app/                 # App Router — home, product/[id], admin, dashboard, success
components/          # Hero sequence, Shop, Cart, Auth, Reviews, Navbar, Footer
context/             # AuthContext, CartContext, ProductContext — global state
lib/                 # products.ts (catalogue), supabase.ts (scaffolded client)
```

Global state is context-based; the Supabase client in `lib/supabase.ts` is scaffolded behind environment variables and the demo build runs on local state.

---

## Run It

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Optional — connect Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## Deploy

Built for Vercel — import the repo, framework preset `Next.js`, deploy.

---

<div align="center">

**Aditya Pratap** — Creative Technologist<br>
Gorakhpur, India — [github.com/adityapratap0077-cloud](https://github.com/adityapratap0077-cloud)

</div>
