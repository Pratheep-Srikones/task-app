import { updateTaskStatusModel } from "@/models/task.model";
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
    const res = await updateTaskStatusModel(task_id, "pending");
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
