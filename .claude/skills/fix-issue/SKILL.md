---
name: fix-issue
description: GitHub 이슈를 번호로 지정하여 수정합니다. 이슈 내용을 자동 로드하고 브랜치 생성부터 PR까지 전체 워크플로우를 안내합니다.
argument-hint: "<이슈번호>"
allowed-tools: Read, Grep, Write, Edit, Bash(git *), Bash(gh *), Bash(npm run *)
model: claude-sonnet-4-6
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: |
            INPUT=$(cat)
            CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
            if echo "$CMD" | grep -qE 'git push.*(origin\s+main|origin\s+master)'; then
              echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"fix-issue skill: main 직접 push 금지. PR을 통해 merge하세요."}}' >&1
            fi
          timeout: 5
---

# 이슈 수정 워크플로우

이슈 #$ARGUMENTS를 수정합니다.

## 이슈 정보 (자동 로드됨)

!`gh issue view $ARGUMENTS --json title,body,labels,assignees 2>/dev/null | jq -r '"제목: \(.title)\n레이블: \([.labels[].name] | join(", "))\n\n설명:\n\(.body)"' 2>/dev/null || echo "이슈를 불러올 수 없습니다. 이슈 번호를 확인하세요."`

## 현재 코드베이스 상태

**최근 커밋:**
!`git log --oneline -5`

**현재 브랜치:**
!`git branch --show-current`

---

## 수행 절차

[workflow.md](workflow.md)의 단계별 가이드를 따라 이슈를 수정합니다.

### 핵심 규칙

1. **브랜치 생성**: `fix/<module>/$ARGUMENTS-<description>` 형식
2. **이슈 assign**: `gh issue edit $ARGUMENTS --add-assignee @me`
3. **착수 코멘트**: `gh issue comment $ARGUMENTS --body "작업을 시작합니다."`
4. **구현 → 테스트**: `npm run build && npm run lint`
5. **PR 생성**: `Closes #$ARGUMENTS` 포함
6. **@main 에이전트에게 리뷰 요청**
