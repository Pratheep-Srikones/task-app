import { getAllPendingTasksModal } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id") as string;

    if (!user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const res = await getAllPendingTasksModal(user_id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
