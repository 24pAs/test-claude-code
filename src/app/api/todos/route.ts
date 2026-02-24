import { NextRequest, NextResponse } from "next/server";
import { todoStore } from "@/lib/store";
import { CreateTodoRequest } from "@/types/todo";

export async function GET() {
  const todos = todoStore.getAll();
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body: CreateTodoRequest = await request.json();

  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const trimmed = body.title.trim();
  if (trimmed.length === 0) {
    return NextResponse.json({ error: "title cannot be empty" }, { status: 400 });
  }

  if (trimmed.length > 200) {
    return NextResponse.json(
      { error: "title must be 200 characters or less" },
      { status: 400 }
    );
  }

  const todo = todoStore.create(trimmed);
  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE() {
  todoStore.deleteAll();
  return new NextResponse(null, { status: 204 });
}
