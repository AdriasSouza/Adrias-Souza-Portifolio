# Adrias Souza — Portfolio

Personal portfolio with a 16-bit retro aesthetic, bilingual support (PT/EN), and an interactive Chrome Dino game as the light-mode background.

**Live sections:** Hero · Projects · About · Skills · Experience · Contact

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.2 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Icons | Lucide React 1.17 |
| Font | Press Start 2P (pixel), Geist Sans/Mono |

---

## Features

- **16-bit retro aesthetic** — pixel font, synthwave palette, neo-brutalist cards with hover lift
- **Dark mode** — animated parallax star layers + synthwave grid floor
- **Light mode** — playable Chrome Dino game as the full-screen background (Space / ↑ to jump)
- **Animated header** — typewriter loop cycling through greeting phrases
- **PT / EN i18n** — full bilingual content, toggled from the header
- **Confidential projects** — lock badge for internal work, GitHub links for open-source
- **CRT scanline overlay** — subtle retro display feel in dark mode

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
npm run lint    # ESLint
```

---

## Project Structure

```text
app/
  layout.tsx      # fonts, metadata, favicon
  page.tsx        # entire single-page app (client component)
  globals.css     # design tokens, Tailwind v4 theme, animations
public/
  images/
    adrias-portrait.png   # portrait (pixel art)
```

---

## Portrait Setup

The portrait is loaded from `public/images/adrias-portrait.png`. The `PORTRAIT_SRC` constant at the top of `app/page.tsx` controls whether it renders — set it to `"/images/adrias-portrait.png"` (already set) or `""` to show the placeholder.

---

## Design Tokens

All tokens live in `globals.css` under `:root` (dark) and `:root.light` (light) and are registered into Tailwind via `@theme inline`. Key variables:

| Token | Dark | Light |
| --- | --- | --- |
| `--background` | `#0a0a14` | `#f4f5fb` |
| `--accent` | `#818cf8` | `#4f46e5` |
| `--accent-gold` | `#fbbf24` | `#b45309` |
| `--surface` | `rgba(22,22,34,0.72)` | `#ffffff` |

---

## License

© Adrias Soares de Souza. All rights reserved.
