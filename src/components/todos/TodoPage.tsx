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
    <div className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
      {/* 헤더 */}
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          Todo List
          <span className="text-xs font-normal px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
            {todos.length}
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {todos.length === 0
            ? "오늘 할 일을 기록하고 관리해보세요."
            : "오늘 할 일을 관리하고 생산성을 높여보세요."}
        </p>
      </header>

      {/* 입력 폼 */}
      <div className="mb-12">
        <TodoForm onCreate={handleCreate} />
      </div>

      {/* 목록 */}
      {loading ? (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
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
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    남은 항목{" "}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {remainingCount}개
                    </span>
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    완료율{" "}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {completionRate}%
                    </span>{" "}
                    ({completedCount}/{todos.length} 항목)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${completionRate}%`, backgroundColor: "#4F46E5" }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs font-medium" style={{ color: "#4F46E5" }}>진행중</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">· 파이팅!</span>
                </div>
              </div>

              {/* 모두 삭제 */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleDeleteAll}
                  className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
