# test-claude-code — Project Plan

## 목적

Claude Code의 기능(CLAUDE.md, skills, hooks, agents)을 실제로 활용하는 예시 프로젝트.
Next.js App Router 기반의 Todo 앱을 만들면서, Claude Code 워크플로우를 함께 구축한다.

---

## 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 16 (App Router) | API Routes 서버리스 함수 지원 |
| 언어 | TypeScript | 타입 안전성 |
| 스타일 | Tailwind CSS | 빠른 UI 구성 |
| 배포 | Vercel | Next.js 네이티브 지원 |
| CI/CD | GitHub Actions | PR 품질 게이트 + 자동 배포 |
| 패키지 매니저 | npm | 기본값 |

---

## 아키텍처

```
src/
├── app/
│   ├── api/todos/          # REST API (in-memory store)
│   │   ├── route.ts        # GET /api/todos, POST /api/todos
│   │   └── [id]/route.ts   # GET/PUT/DELETE /api/todos/:id
│   ├── todos/page.tsx      # Todo 페이지 (Client Component)
│   ├── layout.tsx          # 글로벌 레이아웃 + Navbar
│   └── page.tsx            # 홈 페이지
├── components/
│   ├── layout/Navbar.tsx
│   └── todos/              # TodoList, TodoItem, TodoForm, TodoPage
├── lib/store.ts            # 인메모리 Todo 저장소
└── types/todo.ts           # Todo 타입 정의

.claude/
├── settings.json           # hooks 설정
├── hooks/
│   ├── validate-bash.sh    # main push / force push 차단
│   ├── post-edit-lint.sh   # 파일 저장 시 prettier/eslint 자동 실행
│   ├── session-start.sh    # 세션 시작 시 컨텍스트 주입
│   └── post-pr-merge.sh    # PR merge 후 처리
├── skills/
│   ├── pr-review/          # PR 자동 리뷰
│   ├── fix-issue/          # 이슈 번호로 자동 수정 워크플로우
│   └── api-scaffold/       # API Route 자동 생성
└── commands/               # commit, new-branch, create-pr, create-issue

.github/workflows/
├── ci.yml                  # 모든 PR: lint + build
└── deploy.yml              # main push: Vercel 프로덕션 배포
```

---

## 구현 현황

### 완료

- [x] **Todo CRUD API** — `GET/POST /api/todos`, `GET/PUT/DELETE /api/todos/:id` (인메모리)
- [x] **Todo UI** — TodoList, TodoItem, TodoForm, TodoPage 컴포넌트
- [x] **홈 페이지** — 프로젝트 소개 및 네비게이션
- [x] **글로벌 Navbar** — 모든 페이지 공통 네비게이션 바
- [x] **Claude Code hooks** — validate-bash, post-edit-lint, session-start
- [x] **Claude Code skills** — pr-review, fix-issue, api-scaffold
- [x] **Claude Code commands** — commit, new-branch, create-pr, create-issue
- [x] **GitHub Actions CI** — 모든 PR에서 lint + build 품질 게이트
- [x] **Vercel 자동 배포** — main merge 시 프로덕션 배포
- [x] **배포 URL** — https://test-claude-code-fawn.vercel.app

### 남은 작업

- [ ] **데이터 영속성** — 현재 인메모리 저장소 → SQLite 또는 외부 DB로 교체
- [ ] **인증** — 사용자별 Todo 관리 (NextAuth.js 등)
- [ ] **테스트** — API route 단위 테스트, 컴포넌트 테스트
- [ ] **agents 예시** — 병렬 에이전트 활용 시나리오 문서화
- [ ] **Branch Protection** — GitHub required status checks에 `Lint & Build` 등록

---

## Claude Code 워크플로우

### 작업 시작

```bash
# 1. 이슈 생성
/create-issue

# 2. 브랜치 + worktree 생성
git worktree add .worktrees/feat-<module> feat/<module>/<description>

# 3. 작업 후 커밋
/commit

# 4. PR 생성
/create-pr
```

### PR 병합 규칙

- **CI 통과 필수** — lint + build 모두 green
- **@main 에이전트만 merge** — 본인 PR 자가 merge 금지
- **squash merge** — 커밋 히스토리 정리

### 사용 가능한 Skills

| skill | 용도 |
|-------|------|
| `/pr-review` | PR 번호로 코드 리뷰 자동 수행 |
| `/fix-issue` | 이슈 번호로 수정 워크플로우 시작 |
| `/api-scaffold` | 경로/메서드 입력 → API Route 자동 생성 |

---

## 수동 설정 항목 (1회성)

| 항목 | 상태 | 방법 |
|------|------|------|
| GitHub Secrets (VERCEL_TOKEN 등) | ✅ 완료 | repo Settings → Secrets |
| Branch Protection (required status checks) | ⏳ 미완 | CI 최초 실행 후 등록 |
