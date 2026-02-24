# TEST CLAUDE CODE - Development Guide

## Project Overview

claude code에서 사용하는 claude.md, skill, hook, agent 등을 사용하는 예시 프로젝트를 next.js를 이용하여 만들어봅니다.

## Project Subject

CLAUDE.md를 제외한 모든 폴더 및 파일은 claude code에서 만들 수 있습니다.

## Git Workflow for Agent Teams

### Branch Naming Convention

Each agent MUST work on a dedicated feature branch:

```
feat/<module>/<description>    # New features
fix/<module>/<description>     # Bug fixes
refactor/<module>/<description> # Refactoring
test/<module>/<description>    # Test additions
```

Examples:

- `feat/exchange/add-upbit-adapter`
- `fix/risk/circuit-breaker-cooldown`
- `refactor/strategy/extract-quote-pipeline`

### Development Workflow

1. **Create a feature branch** from `main`:

   ```bash
   git checkout main && git pull
   git checkout -b feat/<module>/<description>
   ```

2. **Make commits** following conventional commit format:

   ```
   feat(module): short description
   fix(module): what was broken and how it's fixed
   test(module): what's being tested
   refactor(module): what changed and why
   ```

3. **Push and create PR**:

   ```bash
   git push -u origin feat/<module>/<description>
   gh pr create --title "feat(module): description" --body "..."
   ```

4. **Main is protected** - all changes go through PRs with squash merge.

### CRITICAL: Branch Protection Rules

**절대로 main 브랜치에 직접 push하지 마라.** 이 규칙은 예외 없이 적용된다.

- `git push origin main` 금지. 반드시 feature branch → PR → merge 절차를 따를 것.
- `--force` push 금지.
- 컨텍스트가 압축/리셋되더라도 이 규칙은 항상 유효하다.
- 위반 시 GitHub branch protection rule bypass 경고가 발생하며, 이는 잘못된 워크플로우를 의미한다.

### CRITICAL: PR Review & Merge Policy

**PR은 반드시 @main 에이전트(팀 리드)가 리뷰하고 병합한다.** 이 규칙은 예외 없이 적용된다.

- 에이전트는 자신의 PR을 **직접 병합하지 마라**. PR 생성 후 @main 에이전트에게 리뷰를 요청할 것.
- @main 에이전트만 `gh pr merge`를 실행할 수 있다.
- CI가 통과하지 않은 PR은 병합 불가 (lint, test, typecheck 모두 통과 필수).
- 리뷰 없이 병합된 PR은 워크플로우 위반이다.
- 컨텍스트가 압축/리셋되더라도 이 규칙은 항상 유효하다.

**올바른 절차:**

```bash
# 1. feature branch 생성
git checkout -b feat/<module>/<description>

# 2. 작업 후 커밋
git add <files> && git commit -m "feat(module): description"

# 3. push 후 PR 생성
git push -u origin feat/<module>/<description>
gh pr create --title "feat(module): description" --body "Closes #<issue>"

# 4. @main 에이전트에게 리뷰 요청 (에이전트 본인이 merge하지 않음)
# main 에이전트가 리뷰 후: gh pr merge --squash
```

### CRITICAL: Git Worktree for Parallel Agents

**병렬 작업 시 반드시 `git worktree`를 사용하여 각 에이전트가 독립된 디렉토리에서 작업해야 한다.**
같은 working directory에서 `git checkout`으로 브랜치를 전환하면 uncommitted 변경이 섞여 다른 에이전트의 파일이 PR에 혼입되는 문제가 발생한다. 이 규칙은 예외 없이 적용된다.

**Worktree 설정 (팀 리더가 에이전트 스폰 전에 수행):**

- git worktree 모범 사례를 따라서 만든다.

**에이전트 스폰 시 반드시 해당 worktree 경로를 working directory로 지정:**

- 각 에이전트는 자신만의 worktree 경로에서만 작업

**에이전트 규칙:**

- 자신에게 할당된 worktree 디렉토리 안에서만 작업할 것
- 절대로 메인 repo에서 직접 작업하지 말 것
- `git checkout`으로 브랜치를 전환하지 말 것 (이미 올바른 브랜치에 있음)

**작업 완료 후 정리:**

- 작업 완료 후 자신이 만든 워크트리는 삭제한다.

## GitHub Issue Management for Agents

** GitHub 계정**: gh에 설정되어 있으며 개인 계정에 해당 프로젝트와 동일한 이름의 리모트 레포를 만들어서 연결한다. 절대 orgarniczations인 planetarium 레포에 만들지 않는다.

### Issue Workflow

에이전트는 작업 시작/완료 시 반드시 GitHub Issues를 관리해야 합니다.
**이 규칙은 예외 없이 모든 작업에 적용된다. 컨텍스트 리셋 후에도 반드시 준수할 것.**

1. **작업 시작 전**: 담당 이슈 확인 및 본인 assign

2. **작업 시작 시**: 이슈에 착수 코멘트

3. **브랜치 생성**: 이슈 번호 포함

4. **작업 중 진행 상황 업데이트**: 주요 마일스톤마다 이슈에 코멘트

5. **PR 생성 시**: 이슈 연결 (자동 close) + 이슈에 PR 링크 코멘트

6. **작업 중 발견한 추가 작업**: 새 이슈 생성

### Priority Labels

- `P0: Critical` - 시스템 실행에 필수 (현재 #11-#14)
- `P1: High` - 운영 완성도 (현재 #15-#18)
- `P2: Medium` - 테스트, 문서, CI (#19-#23)
- `P3: Low` - 향후 개선 (#24-#27)
