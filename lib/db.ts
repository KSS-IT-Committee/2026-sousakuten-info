import "server-only";

import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";

declare global {
  // Reuse the pool across HMR reloads in dev to avoid leaking connections.
  let pgClient: ReturnType<typeof postgres> | undefined;
}

type Db = PostgresJsDatabase<typeof schema>;
const MAX_DB_CONNECTIONS = 10;
const globalForDb = globalThis as typeof globalThis & {
  pgClient?: ReturnType<typeof postgres>;
};
let _db: Db | undefined;

function getDb(): Db {
  if (_db) return _db;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");
  const client =
    globalForDb.pgClient ?? postgres(databaseUrl, { max: MAX_DB_CONNECTIONS });
  if (process.env.NODE_ENV !== "production") globalForDb.pgClient = client;
  _db = drizzle(client, { schema });
  return _db;
}

export const db = new Proxy({} as Db, {
  get: (_target, prop) => Reflect.get(getDb(), prop),
});
