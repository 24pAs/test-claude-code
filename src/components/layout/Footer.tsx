export function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500 text-sm">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            이용약관
          </a>
          <span>•</span>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            개인정보처리방침
          </a>
          <span>•</span>
          <a
            href="https://github.com/24pAs/test-claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-xs">
          © 2024 TodoApp. Made with Love.
        </p>
      </div>
    </footer>
  );
}
