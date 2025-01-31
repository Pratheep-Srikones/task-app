import { deleteTaskModel, updateTaskModel } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { task_id, title, description, due_at } = await req.json();

  if (!task_id || !title || !description || !due_at) {
    return NextResponse.json(
      {
        error: "All fields (task_id, title, description, due_at) are required.",
      },
      { status: 400 }
    );
  }

  const res = await updateTaskModel(task_id, title, description, due_at);
  return NextResponse.json(res, { status: 200 });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const task_id = url.searchParams.get("task_id") as string;

  if (!task_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const res = await deleteTaskModel(task_id);
  return NextResponse.json(res, { status: 200 });
}
