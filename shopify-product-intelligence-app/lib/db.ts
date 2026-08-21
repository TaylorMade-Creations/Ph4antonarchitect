import "server-only";

import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

const missingDatabaseUrl = (..._args: unknown[]) => {
  throw new Error("Missing DATABASE_URL");
};

const missingDatabaseSql = Object.assign(missingDatabaseUrl, {
  transaction: async () => {
    throw new Error("Missing DATABASE_URL");
  },
});

export const sql: any = databaseUrl ? neon(databaseUrl) : missingDatabaseSql;
