# Velyn

Velyn is a Next.js App Router portrait studio with curated templates, GSAP motion, and browser-based poster editing/export tools.

## Scripts

- `npm run dev` starts the Next.js development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.

## Clerk

Clerk is wired through `src/app/providers.tsx` and `src/proxy.ts` using a public-first route strategy. Add these values when authentication is needed:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Without those keys, the public marketing/editor experience still renders locally.
