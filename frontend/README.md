# HLAD Website (Next.js)

HLAD (Hindi Literature and Debating Club) website frontend migrated to Next.js with App Router, TypeScript, Tailwind CSS v4, semantic theme tokens, and day/night mode support.

## What Has Been Done

The frontend migration and styling refactor currently includes:

1. React to Next.js migration using App Router.
2. Home page split into reusable sections:
	- Header
	- Hero
	- About
	- Events
	- Team
	- FAQ
	- Footer
3. Semantic styling refactor:
	- Removed hardcoded color values from primary sections.
	- Moved to theme-based utilities such as `bg-primary`, `text-foreground`, `bg-muted`, `text-muted-foreground`.
4. Typography refactor:
	- Font utilities used via semantic classes (`font-display`, `font-body`, `font-hindi-serif`, `font-hindi-devanagari`).
	- Fonts configured through `next/font` and exposed as CSS variables.
5. Day/Night mode:
	- Added theme switching with `next-themes`.
	- Added Theme Toggle button in header.
	- Theme tokens change through `.dark` variable overrides.
6. Production build validation:
	- Project builds successfully with `npm run build`.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- next-themes (theme switching)
- motion (animations)
- Radix UI primitives
- Lucide icons

## Project Structure (Important Parts)

```text
app/
  layout.tsx          # Root layout, fonts, ThemeProvider
  page.tsx            # Page composition (all sections)
  globals.css         # Global imports
  tailwind.css        # Tailwind entry
  theme.css           # Theme tokens and dark mode variables

src/components/
  Header.tsx
  HeroSection.tsx
  AboutSection.tsx
  EventsSection.tsx
  TeamSection.tsx
  FAQSection.tsx
  Footer.tsx
  ThemeToggle.tsx
  index.ts            # Section exports

src/components/shared/
  theme-provider.tsx  # next-themes provider wrapper
```

## How To Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

App runs at:

```text
http://localhost:3000
```

### 3. Create a production build

```bash
npm run build
```

### 4. Run production server locally

```bash
npm run start
```

## Available Scripts

- `npm run dev` - start Next.js dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Theme and Styling Notes

- Theme tokens are defined in `app/theme.css`.
- Dark mode is token-based (via `.dark` overrides), so components should use semantic classes instead of hardcoded colors.
- If adding new UI, prefer semantic tokens:
  - Colors: `primary`, `secondary`, `background`, `foreground`, `muted`, `muted-foreground`, `card`
  - Fonts: `font-display`, `font-body`, `font-hindi-serif`, `font-hindi-devanagari`

## Build/Run Status

Current known status:

- Dev server works (`npm run dev`)
- Production build passes (`npm run build`)

## Deployment

You can deploy this project on any platform that supports Next.js (for example Vercel).

Recommended workflow:

1. Run `npm run lint`
2. Run `npm run build`
3. Deploy

## Maintainer Notes

- Keep styles semantic and token-driven.
- Avoid introducing raw hex colors in section components.
- Keep reusable UI in `src/components/ui` and page sections in `src/components`.
