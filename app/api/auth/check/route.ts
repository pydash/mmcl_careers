import { NextResponse } from "next/server";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ message: "Not logged in" }, { status: 200 });
    }

    const result = await db
      .query(
        `SELECT 
            role
      FROM sessions
      WHERE session_token = $1;`,
        [sessionToken],
      )
      .then((res) => {
        if (res.rows.length === 0) {
          return null;
        }
        return res.rows[0].role;
      });

    return NextResponse.json({ role: result }, { status: 200 });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Session check failed" },
      { status: 500 },
    );
  }
}
