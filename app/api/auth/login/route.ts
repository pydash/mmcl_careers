import db from "@/lib/db";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    // Fetch user from database
    const result = await db.query(
      "SELECT id, email, password_hash, role FROM user_accounts WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const user = result.rows[0];

    // Compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    // Create session
    const session_response = await createSession(user.id, user.email);

    if (!session_response) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true, role: user.role });
  } catch (error: any) {
    const errorMsg = error?.message || "Unknown error";
    console.error("Error logging in user:", errorMsg);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}
