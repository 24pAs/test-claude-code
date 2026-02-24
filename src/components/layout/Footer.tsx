export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
        <p>© 2024 TodoApp. Made with Love.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              이용약관
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              개인정보처리방침
            </a>
          </li>
          <li>
            <a
              href="https://github.com/24pAs/test-claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
