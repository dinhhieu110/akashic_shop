import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// The HTTP driver queries over fetch(). Opt out of Next's fetch cache so that
// "use cache" + cacheTag in src/lib/catalog/queries.ts is the only cache layer.
// Otherwise query responses are stored untagged, survive rebuilds and
// ignore revalidateTag().
const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { cache: "no-store" },
});

export const db = drizzle({ client: sql, schema });
