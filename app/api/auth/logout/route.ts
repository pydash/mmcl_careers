import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const session_token = cookieStore.get("session_token")?.value;

    if (!session_token) {
      return NextResponse.json(
        { error: "No session token found" },
        { status: 400 },
      );
    }

    const result = await db.query(
      "DELETE FROM sessions WHERE session_token = $1",
      [session_token],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Session not found or already expired" },
        { status: 404 },
      );
    }

    // Clear cookies
    cookieStore.delete("session_token");
    cookieStore.delete("session_user_id");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
