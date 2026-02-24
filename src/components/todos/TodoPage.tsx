"use client";

import { useState, useEffect, useCallback } from "react";
import { Todo } from "@/types/todo";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("목록을 불러오는 데 실패했습니다.");
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function handleCreate(title: string) {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("생성에 실패했습니다.");
    const newTodo: Todo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
  }

  async function handleToggle(id: string) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (!res.ok) throw new Error("업데이트에 실패했습니다.");
    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("삭제에 실패했습니다.");
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Todo List
      </h1>

      <div className="mb-6">
        <TodoForm onCreate={handleCreate} />
      </div>

      {loading ? (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
          불러오는 중...
        </p>
      ) : error ? (
        <p className="text-center text-sm text-red-500 py-8">{error}</p>
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  );
}
