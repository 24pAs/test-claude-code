# Fix Issue 워크플로우 가이드

## Step 1. 이슈 파악 및 준비

```bash
# 이슈 상세 확인
gh issue view <번호>

# 이슈 본인 assign
gh issue edit <번호> --add-assignee @me

# 착수 코멘트 작성
gh issue comment <번호> --body "작업을 시작합니다."
```

## Step 2. 브랜치 생성

```bash
# main에서 분기
git checkout main && git pull origin main

# 브랜치 생성 (이슈 번호 포함)
git checkout -b fix/<module>/<번호>-<short-description>
# 예: fix/auth/42-login-null-error
```

## Step 3. 구현

- 이슈에서 설명한 문제의 **근본 원인** 파악 후 수정
- 관련 파일을 Read/Grep으로 먼저 이해한 후 Edit
- 최소한의 변경으로 문제 해결 (over-engineering 금지)

## Step 4. 검증

```bash
# 타입 체크
npx tsc --noEmit

# 린트
npm run lint

# 빌드 확인
npm run build
```

## Step 5. 커밋 및 PR

```bash
# 커밋
git add <files>
git commit -m "fix(<module>): <이슈 설명>

Closes #<번호>"

# push
git push -u origin fix/<module>/<번호>-<description>

# PR 생성
gh pr create \
  --title "fix(<module>): <설명>" \
  --body "## 변경 사항\n- \n\nCloses #<번호>"
```

## Step 6. 이슈 진행 상황 업데이트

```bash
# PR 링크를 이슈에 코멘트
gh issue comment <번호> --body "PR 생성 완료: <PR URL>\n@main 에이전트에게 리뷰를 요청합니다."
```

## 주의사항

- `main` 브랜치 직접 push 금지 (hook이 자동 차단)
- PR은 @main 에이전트가 review 후 merge (본인 merge 금지)
- CI 통과 필수 (lint, typecheck, build)
