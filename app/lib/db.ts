import { Pool } from "pg";

export type TodoStatus = "A_FAIRE" | "FAITE";

export type Todo = {
  id: number;
  title: string;
  description: string | null;
  status: TodoStatus;
  created_at: Date;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const globalForPg = globalThis as unknown as {
  pgPool?: Pool;
};

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'A_FAIRE' CHECK (status IN ('A_FAIRE', 'FAITE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}
