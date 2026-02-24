---
description: 현재 브랜치의 변경사항으로 GitHub PR을 생성합니다. 커밋 히스토리를 분석하여 PR 제목과 본문을 자동 작성합니다.
argument-hint: "[이슈번호] (선택: 연결할 GitHub 이슈)"
---

# Pull Request 생성

현재 브랜치에서 `main`으로 향하는 PR을 생성합니다.

## 절차

1. 현재 브랜치 확인: `git branch --show-current`
2. `main`과의 커밋 차이 분석: `git log main...HEAD --oneline`
3. 변경 파일 목록: `git diff main...HEAD --name-only`
4. 아직 push되지 않았으면 `git push -u origin <branch>` 실행
5. PR 생성: `gh pr create`

## PR 형식

```markdown
## 요약
- 변경 내용 bullet point (최대 3개)

## 변경 사항
- 상세 변경 내역

## 테스트 계획
- [ ] 로컬 빌드 확인 (`npm run build`)
- [ ] 타입 체크 (`npm run typecheck`)
- [ ] 린트 (`npm run lint`)

## 관련 이슈
Closes #<이슈번호>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## 규칙

- main 브랜치에서 실행 시 오류 안내
- `$ARGUMENTS`로 이슈 번호 제공 시 `Closes #<번호>` 자동 추가
- PR 생성 후 @main 에이전트에게 리뷰 요청 안내 출력
- CI 통과 여부 확인 안내
