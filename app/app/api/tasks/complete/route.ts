import {
  deleteCompletedTasksModel,
  updateTaskStatusModel,
} from "@/models/task.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { task_id } = await req.json();
  if (!task_id) {
    return NextResponse.json(
      { error: "task_id is required." },
      { status: 400 }
    );
  }
  try {
    const res = await updateTaskStatusModel(task_id, "completed");
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error completing task:", error.message);
    } else {
      console.error("Error completing task:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get("user_id") as string;

  if (!user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const res = await deleteCompletedTasksModel(user_id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting completed tasks:", error.message);
    } else {
      console.error("Error deleting completed tasks:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
