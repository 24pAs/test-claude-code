# API Route 컨벤션

## 파일 위치

```
src/app/api/<resource>/route.ts          # 컬렉션 엔드포인트
src/app/api/<resource>/[id]/route.ts     # 단일 리소스 엔드포인트
```

## 필수 패턴

### 1. Request/Response 타입 정의

모든 API는 명시적 타입을 가져야 합니다:

```typescript
// Request body 타입
interface CreateUserRequest {
  name: string;
  email: string;
}

// Response 타입
interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// 에러 응답 타입 (공통)
interface ErrorResponse {
  error: string;
  code?: string;
}
```

### 2. HTTP 메서드별 패턴

```typescript
// GET - 데이터 조회
export async function GET(request: Request) {
  try {
    // ... 조회 로직
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: '조회 실패' }, { status: 500 });
  }
}

// POST - 데이터 생성
export async function POST(request: Request) {
  try {
    const body: CreateUserRequest = await request.json();
    // ... 생성 로직
    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json({ error: '생성 실패' }, { status: 500 });
  }
}
```

### 3. 동적 라우트 파라미터

```typescript
// src/app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // ... 로직
}
```

### 4. 에러 처리 원칙

- 400: 입력값 검증 실패
- 401: 인증 필요
- 403: 권한 없음
- 404: 리소스 없음
- 500: 서버 내부 오류

### 5. 금지 사항

- `any` 타입 사용 금지
- `console.log` 프로덕션 코드에 남기기 금지
- 환경변수 하드코딩 금지 (`process.env.XXX` 사용)
