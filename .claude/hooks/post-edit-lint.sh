#!/bin/bash
# PostToolUse hook: 파일 저장/수정 후 자동 lint + format

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# TypeScript/JavaScript/TSX/JSX 파일만 처리
if echo "$FILE_PATH" | grep -qE '\.(ts|tsx|js|jsx)$'; then
  PROJECT_DIR="$CLAUDE_PROJECT_DIR"
  if [ -z "$PROJECT_DIR" ]; then
    PROJECT_DIR=$(pwd)
  fi

  # prettier 포맷
  if [ -f "$PROJECT_DIR/node_modules/.bin/prettier" ]; then
    "$PROJECT_DIR/node_modules/.bin/prettier" --write "$FILE_PATH" 2>/dev/null
    echo "[HOOK] Prettier 적용: $FILE_PATH" >&2
  fi

  # eslint fix
  if [ -f "$PROJECT_DIR/node_modules/.bin/eslint" ]; then
    "$PROJECT_DIR/node_modules/.bin/eslint" --fix "$FILE_PATH" 2>/dev/null || true
    echo "[HOOK] ESLint 적용: $FILE_PATH" >&2
  fi
fi

exit 0
