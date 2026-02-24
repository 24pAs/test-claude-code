# PR 리뷰 체크리스트

## 필수 항목 (모두 통과 필수)

### 코드 품질
- [ ] TypeScript 타입이 명확하게 정의되어 있는가? (`any` 남용 없음)
- [ ] 함수/컴포넌트 책임이 단일한가 (SRP)?
- [ ] 중복 코드 없이 기존 유틸리티를 재사용하는가?
- [ ] 불필요한 `console.log` 또는 디버그 코드가 없는가?

### Next.js 컨벤션
- [ ] App Router 패턴을 올바르게 사용하는가? (`use client` 위치 등)
- [ ] Server/Client Component 구분이 적절한가?
- [ ] 이미지 최적화 (`next/image`) 사용 여부
- [ ] 적절한 Loading/Error boundary 처리

### 보안
- [ ] 사용자 입력값이 검증되는가?
- [ ] 환경 변수가 클라이언트에 노출되지 않는가? (`NEXT_PUBLIC_` 규칙 준수)
- [ ] XSS 취약점 없음 (`dangerouslySetInnerHTML` 남용 없음)
- [ ] API Route에서 인증/인가 검증 여부

### 성능
- [ ] 불필요한 리렌더링 방지 (`useMemo`, `useCallback` 적절히 사용)
- [ ] 큰 번들 사이즈 유발하는 import 없음 (dynamic import 고려)

## 권장 항목

- [ ] 에러 처리가 일관성 있게 적용됨
- [ ] 테스트 코드 포함 또는 기존 테스트 업데이트
- [ ] 변경사항에 맞는 문서/주석 업데이트
