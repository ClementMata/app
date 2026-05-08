"use client";

import { useRef, useState } from "react";
import { addTodoAction } from "@/app/actions";

export function AddTodoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button className="button" type="button" onClick={() => setIsOpen(true)}>
        + Ajouter
      </button>

      {isOpen ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="add-todo-title">
            <div className="modal-header">
              <h2 id="add-todo-title">Ajouter une tâche</h2>
              <button
                className="close-button"
                type="button"
                aria-label="Fermer"
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                await addTodoAction(formData);
                formRef.current?.reset();
                setIsOpen(false);
              }}
            >
              <div className="field">
                <label htmlFor="title">Titre</label>
                <input id="title" name="title" required maxLength={160} autoFocus />
              </div>

              <div className="field">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" maxLength={1000} />
              </div>

              <div className="modal-actions">
                <button className="button secondary" type="button" onClick={() => setIsOpen(false)}>
                  Annuler
                </button>
                <button className="button" type="submit">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
