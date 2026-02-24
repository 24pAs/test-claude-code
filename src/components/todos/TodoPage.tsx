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
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* 헤더 */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Todo List
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {todos.length === 0
            ? "오늘 할 일을 기록하고 관리해보세요."
            : "오늘 할 일을 관리하고 생산성을 높여보세요."}
        </p>
      </header>

      {/* 입력 폼 */}
      <section className="mb-8">
        <TodoForm onCreate={handleCreate} />
      </section>

      {/* 목록 */}
      {loading ? (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
          불러오는 중...
        </p>
      ) : error ? (
        <p className="text-center text-sm text-red-500 py-8">{error}</p>
      ) : (
        <section className="space-y-3">
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />

          {todos.length > 0 && (
            <>
              {/* 남은 항목 + 모두 삭제 */}
              <div className="flex items-center justify-between pt-6 px-2 text-sm">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span className="font-semibold" style={{ color: "#4F46E5" }}>{remainingCount}개</span> 남음
                </div>
                <button
                  onClick={handleDeleteAll}
                  className="flex items-center gap-1 font-medium text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>delete_sweep</span>
                  모두 삭제
                </button>
              </div>

              {/* 통계 2열 카드 */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#4F46E5" }}>
                    완료율
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</span>
                    <span className="text-xs text-indigo-400 dark:text-indigo-500 mb-1">{completedCount}/{todos.length} 항목</span>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-600 dark:text-emerald-400">
                    오늘의 목표
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">진행중</span>
                    <span className="text-xs text-emerald-400 dark:text-emerald-500 mb-1">파이팅!</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
