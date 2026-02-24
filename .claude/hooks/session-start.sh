#!/bin/bash
# SessionStart hook: 세션 시작 시 프로젝트 컨텍스트 주입

cat << 'EOF'
=== test-claude-code 프로젝트 컨텍스트 ===

[규칙 - 반드시 준수]
1. main 브랜치 직접 push 금지 → feature branch → PR → merge만 허용
2. PR merge는 @main 에이전트만 수행 (본인 PR 자가 merge 금지)
3. 병렬 작업 시 git worktree 필수 사용
4. 모든 작업은 GitHub Issue와 연결

[브랜치 컨벤션]
  feat/<module>/<description>
  fix/<module>/<description>
  refactor/<module>/<description>

[커밋 컨벤션]
  feat(module): description
  fix(module): description

[패키지 매니저] npm
[프레임워크] Next.js (App Router, TypeScript, Tailwind CSS)
[GitHub] 계정: 24pAs / 레포: test-claude-code

===========================================
EOF
