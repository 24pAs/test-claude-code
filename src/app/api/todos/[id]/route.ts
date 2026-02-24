import { NextRequest, NextResponse } from "next/server";
import { todoStore } from "@/lib/store";
import { UpdateTodoRequest } from "@/types/todo";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body: UpdateTodoRequest = await request.json();

  const updated = todoStore.update(id, body);
  if (!updated) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = todoStore.delete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
