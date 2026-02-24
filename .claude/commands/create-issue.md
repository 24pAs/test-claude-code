---
description: GitHub Issue를 생성합니다. 작업 시작 전 이슈를 먼저 생성하고 본인을 assign합니다.
argument-hint: "<이슈 제목> 또는 자연어 설명"
---

# GitHub Issue 생성

`$ARGUMENTS`를 기반으로 GitHub Issue를 생성하고 본인을 assign합니다.

## 절차

1. 이슈 제목과 설명 준비 (`$ARGUMENTS` 분석)
2. 적절한 우선순위 레이블 선택
3. `gh issue create` 실행
4. 본인 assign: `gh issue edit <번호> --add-assignee @me`
5. 착수 코멘트 추가

## Issue 형식

```markdown
## 목표
<작업의 목적과 기대 결과>

## 작업 범위
- [ ] 세부 작업 1
- [ ] 세부 작업 2

## 완료 기준 (Definition of Done)
- [ ] 코드 구현 완료
- [ ] 테스트 통과
- [ ] PR 생성 및 리뷰 요청
```

## 우선순위 레이블

| 레이블 | 설명 |
|--------|------|
| `P0: Critical` | 시스템 실행에 필수 |
| `P1: High` | 운영 완성도 |
| `P2: Medium` | 테스트, 문서, CI |
| `P3: Low` | 향후 개선 |

## 규칙

- 이슈 생성 후 반드시 본인 assign
- 착수 코멘트: "작업을 시작합니다."
- 연결 브랜치명은 `feat/<module>/<이슈번호>-<description>` 형식 권장
- `/new-branch` 커맨드로 이슈와 연결된 브랜치 바로 생성 가능
