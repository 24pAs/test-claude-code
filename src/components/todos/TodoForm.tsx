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
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-500/20"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요..."
        maxLength={200}
        disabled={submitting}
        className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100 outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!title.trim() || submitting}
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        style={{
          backgroundColor: "#4F46E5",
          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
        {submitting ? "추가 중..." : "추가"}
      </button>
    </form>
  );
}
