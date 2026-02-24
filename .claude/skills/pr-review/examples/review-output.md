# 리뷰 출력 예시

아래 형식으로 리뷰 결과를 작성합니다:

---

## PR #42 리뷰 결과

**판정: Request Changes** ❌

### 요약
로그인 API 엔드포인트 구현 전반적으로 잘 되었지만, 보안 관련 수정이 필요합니다.

### 필수 수정 사항

#### 🔴 Critical

**`src/app/api/auth/login/route.ts:23`**
```typescript
// ❌ 현재 코드
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

// ✅ 수정 필요
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
```
> SQL Injection 취약점. Parameterized query 사용 필수.

#### 🟡 Major

**`src/components/LoginForm.tsx:45`**
- `any` 타입 사용 중 → 명시적 타입 정의 필요
- 에러 상태가 `console.error`로만 처리됨 → UI에서 사용자에게 표시 필요

### 참고 의견 (Optional)

**`src/app/api/auth/login/route.ts:10`**
- rate limiting 추가를 고려해보세요 (브루트포스 방지)

### 잘 된 점 ✅
- Server Component / Client Component 구분 명확
- `next/image` 적절히 사용
- TypeScript strict mode 준수

---

**다음 단계:** 위 수정 사항 반영 후 재요청 해주세요.
