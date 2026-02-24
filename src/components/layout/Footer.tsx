export function Footer() {
  return (
    <footer className="mt-auto py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
          Made with{" "}
          <span
            className="material-symbols-outlined text-red-500"
            style={{
              fontSize: 16,
              fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20",
            }}
          >
            favorite
          </span>{" "}
          for productivity
        </p>
        <div className="mt-4 flex justify-center gap-6 opacity-60">
          <a
            href="https://github.com/24pAs/test-claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity text-xs font-bold text-slate-500"
          >
            GitHub
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity text-xs font-bold text-slate-500">
            LinkedIn
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity text-xs font-bold text-slate-500">
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
}
