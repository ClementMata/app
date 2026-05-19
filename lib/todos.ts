import { unstable_noStore as noStore } from "next/cache";
import { ensureSchema, getPool, type Todo, type TodoStatus } from "@/lib/db";

export async function getTodos(): Promise<Todo[]> {
  noStore();
  await ensureSchema();

  const result = await getPool().query<Todo>(`
    SELECT id, title, description, status, created_at
    FROM todos
    ORDER BY
      CASE status WHEN 'A_FAIRE' THEN 0 ELSE 1 END,
      created_at DESC
  `);

  return result.rows;
}

export async function createTodo(title: string, description: string | null) {
  await ensureSchema();
  await getPool().query(
    `
      INSERT INTO todos (title, description)
      VALUES ($1, $2)
    `,
    [title, description],
  );
}

export async function updateTodoStatus(id: number, status: TodoStatus) {
  await ensureSchema();
  await getPool().query(
    `
      UPDATE todos
      SET status = $2
      WHERE id = $1
    `,
    [id, status],
  );
}

export async function deleteTodo(id: number) {
  await ensureSchema();
  await getPool().query(
    `
      DELETE FROM todos
      WHERE id = $1
    `,
    [id],
  );
}
