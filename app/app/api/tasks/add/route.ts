import { addTaskModel } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { title, description, due_at, user_id } = await req.json();

    if (!title || !description || !due_at) {
      return NextResponse.json(
        {
          error: "All fields (title, description, due_at) are required.",
        },
        { status: 400 }
      );
    }

    const res = await addTaskModel(user_id, title, description, due_at);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding task:", error.message);
    } else {
      console.error("Error adding task:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
