#!/bin/bash
# PreToolUse hook: Bash 명령 검증
# - main 브랜치 직접 push 차단
# - 위험한 명령어 차단

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# main 브랜치 직접 push 차단
if echo "$COMMAND" | grep -qE 'git push.*(origin\s+main|origin\s+master)'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"main 브랜치에 직접 push는 금지되어 있습니다. feature branch → PR → merge 절차를 따르세요."}}' >&1
  echo "[HOOK] main 브랜치 직접 push 차단됨: $COMMAND" >&2
  exit 0
fi

# force push 차단
if echo "$COMMAND" | grep -qE 'git push.*--force|git push.*-f\b'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"--force push는 금지되어 있습니다."}}' >&1
  echo "[HOOK] force push 차단됨: $COMMAND" >&2
  exit 0
fi

# rm -rf 차단 (node_modules, .git 제외)
if echo "$COMMAND" | grep -qE 'rm -rf' && ! echo "$COMMAND" | grep -qE 'node_modules|\.next|dist|build|tmp|temp'; then
  echo "[HOOK] 경고: rm -rf 명령 감지됨 - 관리자에게 확인 요청" >&2
fi

exit 0
