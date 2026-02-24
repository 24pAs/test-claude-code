---
name: pr-review
description: PR을 리뷰합니다. PR 번호를 기반으로 변경사항을 자동 분석하여 코드 품질, 보안, 컨벤션을 검토합니다.
argument-hint: "<PR번호>"
context: fork
agent: Explore
allowed-tools: Bash(gh *), Read, Grep
model: claude-sonnet-4-6
---

# PR 코드 리뷰

PR #$ARGUMENTS를 리뷰합니다.

## PR 정보 (자동 로드됨)

**제목 및 설명:**
!`gh pr view $ARGUMENTS --json title,body,author,baseRefName,headRefName 2>/dev/null | jq -r '"제목: \(.title)\n작성자: \(.author.login)\n베이스: \(.baseRefName) ← \(.headRefName)\n\n설명:\n\(.body)"' 2>/dev/null || echo "PR 정보를 불러올 수 없습니다. gh auth 상태를 확인하세요."`

**변경된 파일:**
!`gh pr diff $ARGUMENTS --name-only 2>/dev/null || echo "(파일 목록을 불러올 수 없습니다)"`

**변경사항 (Diff):**
!`gh pr diff $ARGUMENTS 2>/dev/null | head -300 || echo "(Diff를 불러올 수 없습니다)"`

---

## 리뷰 작업

위 PR 내용을 바탕으로 [review-checklist.md](review-checklist.md)의 기준에 따라 리뷰를 수행하세요.

### 리뷰 출력 형식

[examples/review-output.md](examples/review-output.md) 형식으로 리뷰 결과를 작성하세요.

### 최종 판정

- **Approve**: 모든 체크리스트 통과, 즉시 merge 가능
- **Request Changes**: 수정 필요 항목 명시
- **Comment**: 참고 의견만 (merge 차단 없음)
