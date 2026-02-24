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
    <li className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={busy}
        className="h-4 w-4 cursor-pointer accent-blue-500 disabled:cursor-not-allowed"
      />
      <span
        className={`flex-1 text-sm ${
          todo.completed
            ? "line-through text-gray-400 dark:text-gray-500"
            : "text-gray-800 dark:text-gray-100"
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        disabled={busy}
        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="삭제"
      >
        ✕
      </button>
    </li>
  );
}
