import { Todo, UpdateTodoRequest } from "@/types/todo";

const todos = new Map<string, Todo>();

export const todoStore = {
  getAll(): Todo[] {
    return Array.from(todos.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  create(title: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.set(todo.id, todo);
    return todo;
  },

  update(id: string, patch: UpdateTodoRequest): Todo | null {
    const existing = todos.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch };
    todos.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return todos.delete(id);
  },

  deleteAll(): void {
    todos.clear();
  },
};
