# Akashic Shop

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run db:migrate     # create the tables
npm run db:seed        # load the sample catalog
npm run dev
```

`npm run build` reads the catalog while prerendering, so it needs a migrated and seeded database.

## Structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth route handler
  db/
    index.ts                     Drizzle client (Neon HTTP driver)
    schema/                      Drizzle tables (catalog.ts: categories, products, product_images)
    seed.ts, seed-data.ts        sample catalog loader
  lib/
    auth.ts                      Better Auth server instance
    auth-client.ts               Better Auth React client
drizzle.config.ts                drizzle-kit config
drizzle/                         generated migrations
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/schema/auth.ts` |
| `npm run db:seed` | Load the sample catalog (safe to re-run) |
| `npm run db:generate` | Generate SQL migrations from the schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Open Drizzle Studio |

## Next steps

1. `npm run auth:generate` to add the Better Auth tables, then export them from `src/db/schema/index.ts`.
2. `npm run db:generate && npm run db:migrate`.
3. Enable an auth method (e.g. `emailAndPassword`) in `src/lib/auth.ts`.
