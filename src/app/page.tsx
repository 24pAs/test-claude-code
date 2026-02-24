import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden" style={{ backgroundColor: "#F8FAFF" }}>
      {/* 장식용 블러 오브 */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 288,
          height: 288,
          top: 240,
          left: -80,
          background: "rgba(96, 165, 250, 0.2)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 288,
          height: 288,
          top: 432,
          right: -80,
          background: "rgba(192, 132, 252, 0.2)",
          filter: "blur(100px)",
        }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* 뱃지 */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "#EFF6FF",
              border: "1px solid #DBEAFE",
              color: "#4F46E5",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#4F46E5" }}
            />
            Claude Code 예시 프로젝트
          </div>

          {/* 제목 */}
          <h1
            className="font-black"
            style={{
              fontSize: 72,
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: "#0F172A",
            }}
          >
            심플한 Todo 앱
          </h1>

          {/* 설명 */}
          <p
            className="leading-relaxed text-center"
            style={{ fontSize: 20, color: "#475569", maxWidth: 620 }}
          >
            Next.js App Router와 In-memory store로 만든 Todo CRUD 앱입니다.
            <br />
            Claude Code의 hooks, skills, agents 활용 예시를 담고 있습니다.
          </p>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/todos"
              className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "#4F46E5",
                borderRadius: 16,
                padding: "16px 32px",
                fontSize: 16,
                boxShadow: "0px 10px 25px -5px rgba(79, 70, 229, 0.4)",
              }}
            >
              할 일 관리 시작하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://github.com/24pAs/test-claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "16px 32px",
                fontSize: 16,
                color: "#0F172A",
              }}
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
