---
description: CLAUDE.md 브랜치 컨벤션에 맞는 feature branch를 생성합니다.
argument-hint: "<type>/<module>/<description> 또는 자연어 설명"
---

# Feature Branch 생성

`$ARGUMENTS`를 기반으로 브랜치를 생성합니다.

## 절차

1. 현재 브랜치와 git status 확인
2. `main` 브랜치에서 분기: `git checkout main && git pull origin main`
3. 브랜치 이름 결정 (아래 컨벤션 참고)
4. `git checkout -b <branch-name>` 실행
5. 생성된 브랜치 확인

## 브랜치 컨벤션

```
feat/<module>/<description>    # 새 기능
fix/<module>/<description>     # 버그 수정
refactor/<module>/<description> # 리팩토링
test/<module>/<description>    # 테스트
```

## 예시

| 입력 | 생성되는 브랜치 |
|------|----------------|
| `feat/auth/add-login-page` | `feat/auth/add-login-page` |
| `로그인 기능 추가` | `feat/auth/add-login-page` (자동 변환) |
| `fix/api/null-pointer` | `fix/api/null-pointer` |

## 규칙

- `$ARGUMENTS`가 자연어인 경우 적절한 브랜치명으로 변환
- 이미 같은 이름의 브랜치가 있으면 확인 후 진행
- 브랜치 생성 후 연결할 GitHub Issue 번호 입력 안내
