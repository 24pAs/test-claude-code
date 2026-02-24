---
name: api-scaffold
description: Next.js App Router API Route를 프로젝트 컨벤션에 맞게 생성합니다. 경로와 HTTP 메서드를 입력하면 타입, 핸들러, 에러 처리가 포함된 파일을 자동 생성합니다.
argument-hint: "<API경로> [GET|POST|PUT|DELETE]"
allowed-tools: Read, Write, Bash(npm run lint)
model: claude-haiku-4-5-20251001
disable-model-invocation: false
---

# Next.js API Route 스캐폴딩

`$ARGUMENTS`를 파싱하여 API Route 파일을 생성합니다.

## 현재 프로젝트 API 구조

!`find src/app/api -name "route.ts" 2>/dev/null | head -20 || echo "(아직 API route 없음)"`

## 작업 지시

### 1. 입력 파싱

`$ARGUMENTS` 형식: `<경로> [메서드]`
- 예: `/api/users GET POST` → `src/app/api/users/route.ts` 에 GET, POST 핸들러 생성
- 예: `/api/users/[id] GET PUT DELETE` → `src/app/api/users/[id]/route.ts` 생성

### 2. 파일 생성

[conventions.md](conventions.md)의 규칙을 엄수하여 파일을 생성하세요.
[templates/route-template.md](templates/route-template.md)을 기반으로 작성합니다.

### 3. 생성 후 검증

```bash
npm run lint
```

린트 오류가 있으면 즉시 수정하세요.

### 4. 결과 요약

생성된 파일 경로, 구현된 메서드, 타입 정의 위치를 요약 출력하세요.
