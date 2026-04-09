import { NextResponse } from "next/server";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      `SELECT 
          user_id
      FROM sessions
      WHERE session_token = $1;`,
      [sessionToken],
    );

    const userId = result?.rows?.[0]?.user_id;

    return NextResponse.json(userId);
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Session check failed" },
      { status: 500 },
    );
  }
}
