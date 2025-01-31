import { generateJwtToken } from "@/models/0auth.model";
import { getUserModel } from "@/models/user.model";
import { User } from "@/types/types";
import { comparePassword } from "@/utils/password";
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
    const users: User[] = await getUserModel(username);
    const user = users[0];
    if (!user) {
      return NextResponse.json({ error: "user not found", status: 404 });
    }

    const isValid = comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password", status: 400 });
    }

    const token = generateJwtToken({
      user_id: user.user_id,
      username: user.username,
    });

    return NextResponse.json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,
      token,
      status: 200,
    });
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
}
