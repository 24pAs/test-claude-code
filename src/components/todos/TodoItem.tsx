"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [busy, setBusy] = useState(false);

  async function handleToggle() {
    if (busy) return;
    setBusy(true);
    try {
      await onToggle(todo.id);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (busy) return;
    setBusy(true);
    try {
      await onDelete(todo.id);
    } finally {
      setBusy(false);
    }
  }

  return (
    <li
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
        todo.completed
          ? "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4 flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={busy}
          className="h-5 w-5 rounded cursor-pointer disabled:cursor-not-allowed"
          style={{ accentColor: "#4F46E5" }}
        />
        <span
          className={`font-medium ${
            todo.completed
              ? "line-through text-slate-400 dark:text-slate-500"
              : "text-slate-700 dark:text-slate-200"
          }`}
        >
          {todo.title}
        </span>
      </div>

      {/* hover 시 표시되는 액션 버튼 */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!todo.completed && (
          <button
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            title="수정 (미구현)"
            disabled={busy}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>edit</span>
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={busy}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="삭제"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>delete</span>
        </button>
      </div>
    </li>
  );
}
