# API Route 템플릿

## 기본 템플릿 (컬렉션 리소스)

```typescript
// src/app/api/<resource>/route.ts

interface <Resource>Response {
  id: string;
  // ... 필드 추가
  createdAt: string;
}

interface Create<Resource>Request {
  // ... 필드 추가
}

interface ErrorResponse {
  error: string;
}

export async function GET(_request: Request): Promise<Response> {
  try {
    // TODO: 실제 데이터 조회 로직
    const items: <Resource>Response[] = [];
    return Response.json(items);
  } catch (_error) {
    return Response.json({ error: '조회 중 오류가 발생했습니다.' } satisfies ErrorResponse, {
      status: 500,
    });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: Create<Resource>Request = await request.json();
    // TODO: 입력값 검증 및 생성 로직
    const created: <Resource>Response = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    return Response.json(created, { status: 201 });
  } catch (_error) {
    return Response.json({ error: '생성 중 오류가 발생했습니다.' } satisfies ErrorResponse, {
      status: 500,
    });
  }
}
```

## 단일 리소스 템플릿 (`[id]` 라우트)

```typescript
// src/app/api/<resource>/[id]/route.ts

interface <Resource>Response {
  id: string;
  createdAt: string;
}

interface Update<Resource>Request {
  // ... 수정 가능한 필드
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    // TODO: id로 조회
    const item: <Resource>Response = { id, createdAt: new Date().toISOString() };
    return Response.json(item);
  } catch (_error) {
    return Response.json({ error: '조회 중 오류가 발생했습니다.' } satisfies ErrorResponse, {
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    const body: Update<Resource>Request = await request.json();
    // TODO: 수정 로직
    return Response.json({ id, ...body });
  } catch (_error) {
    return Response.json({ error: '수정 중 오류가 발생했습니다.' } satisfies ErrorResponse, {
      status: 500,
    });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    // TODO: 삭제 로직
    return new Response(null, { status: 204 });
  } catch (_error) {
    return Response.json({ error: '삭제 중 오류가 발생했습니다.' } satisfies ErrorResponse, {
      status: 500,
    });
  }
}
```
