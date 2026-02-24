import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* 장식용 블러 오브 */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* 뱃지 */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Claude Code 예시 프로젝트
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white mb-6 sm:text-6xl">
            심플한{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Todo 앱
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Next.js App Router와 In-memory store로 만든 Todo CRUD 앱입니다.
            <br />
            Claude Code의 hooks, skills, agents 활용 예시를 담고 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/todos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5"
            >
              할 일 관리 시작하기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://github.com/24pAs/test-claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
