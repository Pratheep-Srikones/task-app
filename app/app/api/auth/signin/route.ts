import { addUserModel, getUserModel } from "@/models/user.model";
import { hashPassword } from "@/utils/password";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }
  try {
    const user = await getUserModel(username);
    if (user) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting user:", error.message);
    } else {
      console.error("Error getting user:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  try {
    const hashedPassword = hashPassword(password);
    const res = await addUserModel(username, hashedPassword);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding user:", error.message);
    } else {
      console.error("Error adding user:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
