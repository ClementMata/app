import { deleteTodoAction, setTodoStatusAction } from "@/app/actions";
import { AddTodoModal } from "@/app/components/add-todo-modal";
import { getTodos } from "@/lib/todos";

const statusLabels = {
  A_FAIRE: "A FAIRE",
  FAITE: "FAITE",
} as const;

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="page">
      <div className="shell">
        <header className="header">
          <div>
            <p className="eyebrow">Todo list</p>
            <h1>Tâches</h1>
            <p className="subtitle">
              Une page simple pour créer, supprimer et suivre l&apos;état des tâches.
            </p>
          </div>
          <AddTodoModal />
        </header>

        <section className="todo-panel" aria-label="Liste des tâches">
          {todos.length === 0 ? (
            <div className="empty-state">
              <h2>Aucune tâche</h2>
              <p>Ajoutez une première tâche pour commencer.</p>
            </div>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li className="todo-item" key={todo.id}>
                  <div>
                    <p className="todo-title">{todo.title}</p>
                    {todo.description ? (
                      <p className="todo-description">{todo.description}</p>
                    ) : null}
                    <div className="todo-meta">
                      <span className={`badge ${todo.status === "FAITE" ? "done" : "todo"}`}>
                        {statusLabels[todo.status]}
                      </span>
                      <span className="date">
                        Créée le{" "}
                        {new Intl.DateTimeFormat("fr-FR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(todo.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="todo-actions" aria-label={`Actions pour ${todo.title}`}>
                    <form action={setTodoStatusAction}>
                      <input type="hidden" name="id" value={todo.id} />
                      <input type="hidden" name="status" value="A_FAIRE" />
                      <button
                        className={`status-button ${todo.status === "A_FAIRE" ? "active" : ""}`}
                        type="submit"
                      >
                        A FAIRE
                      </button>
                    </form>

                    <form action={setTodoStatusAction}>
                      <input type="hidden" name="id" value={todo.id} />
                      <input type="hidden" name="status" value="FAITE" />
                      <button
                        className={`status-button ${todo.status === "FAITE" ? "active" : ""}`}
                        type="submit"
                      >
                        FAITE
                      </button>
                    </form>

                    <form action={deleteTodoAction}>
                      <input type="hidden" name="id" value={todo.id} />
                      <button className="icon-button" type="submit" aria-label="Supprimer">
                        ×
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
