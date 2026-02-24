---
description: Conventional commit 형식으로 커밋을 생성합니다. 스테이징된 변경사항을 분석하여 적절한 커밋 메시지를 제안합니다.
argument-hint: "[type(scope): message] 또는 비워두면 자동 분석"
---

# Conventional Commit 생성

다음 절차로 커밋을 생성합니다:

1. `git status`와 `git diff --staged`로 스테이징된 변경사항 확인
2. 변경사항을 분석하여 아래 컨벤션에 맞는 커밋 메시지 작성
3. `$ARGUMENTS`가 제공된 경우 해당 메시지를 우선 사용

## 커밋 타입 컨벤션

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 추가/수정 |
| `docs` | 문서 변경 |
| `style` | 코드 스타일 변경 (포맷팅 등) |
| `chore` | 빌드, 패키지 관련 변경 |
| `ci` | CI/CD 설정 변경 |

## 형식

```
<type>(<scope>): <description>

[optional body]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## 규칙

- 스테이징된 파일이 없으면 `git add`할 파일 목록을 먼저 제안
- main 브랜치에서는 커밋 후 반드시 PR 생성 절차 안내
- 커밋 전 `git status`로 현재 브랜치 확인
