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

  async function handleDeleteAll() {
    const res = await fetch("/api/todos", { method: "DELETE" });
    if (!res.ok) throw new Error("전체 삭제에 실패했습니다.");
    setTodos([]);
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.length - completedCount;
  const completionRate =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Todo List
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {todos.length === 0
            ? "오늘 할 일을 기록하고 관리해보세요."
            : "오늘 할 일을 관리하고 생산성을 높여보세요."}
        </p>
      </div>

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
        <>
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />

          {todos.length > 0 && (
            <>
              {/* 통계 섹션 */}
              <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    남은 항목{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {remainingCount}개
                    </span>
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    완료율{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {completionRate}%
                    </span>{" "}
                    ({completedCount}/{todos.length} 항목)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs font-medium text-blue-500 dark:text-blue-400">
                    진행중
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    · 파이팅!
                  </span>
                </div>
              </div>

              {/* 모두 삭제 */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleDeleteAll}
                  className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  모두 삭제
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
