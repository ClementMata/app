"use server";

import { revalidatePath } from "next/cache";
import { createTodo, deleteTodo, updateTodoStatus } from "@/lib/todos";
import type { TodoStatus } from "@/lib/db";

export async function addTodoAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    return;
  }

  await createTodo(title, description || null);
  revalidatePath("/");
}

export async function setTodoStatusAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as TodoStatus;

  if (!Number.isInteger(id) || !["A_FAIRE", "FAITE"].includes(status)) {
    return;
  }

  await updateTodoStatus(id, status);
  revalidatePath("/");
}

export async function deleteTodoAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  await deleteTodo(id);
  revalidatePath("/");
}
