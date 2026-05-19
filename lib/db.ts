import { Pool } from "pg";

export type TodoStatus = "A_FAIRE" | "FAITE";

export type Todo = {
  id: number;
  title: string;
  description: string | null;
  status: TodoStatus;
  created_at: Date;
};

const globalForPg = globalThis as unknown as {
  pgPool?: Pool;
};

export function getPool() {
  if (globalForPg.pgPool) {
    return globalForPg.pgPool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({
    connectionString,
  });

  globalForPg.pgPool = pool;

  return pool;
}

export async function ensureSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'A_FAIRE' CHECK (status IN ('A_FAIRE', 'FAITE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}
