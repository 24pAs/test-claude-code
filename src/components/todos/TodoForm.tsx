"use client";

import { useState, FormEvent } from "react";

interface TodoFormProps {
  onCreate: (title: string) => Promise<void>;
}

export function TodoForm({ onCreate }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    try {
      await onCreate(trimmed);
      setTitle("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요..."
        maxLength={200}
        disabled={submitting}
        className="flex-1 h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!title.trim() || submitting}
        className="flex items-center gap-2 px-6 rounded-xl font-semibold text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "#4F46E5",
          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>add</span>
        {submitting ? "추가 중..." : "추가"}
      </button>
    </form>
  );
}
