import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews_query_result = await db
      .query(
        `SELECT 
          i.title, 
          i.interview_mode AS mode, 
          i.scheduled_at 
        FROM interviews AS i 
        LEFT JOIN applications a ON i.app_id = a.id 
        WHERE a.profile_id = $1 AND i.scheduled_at >= NOW() 
        ORDER BY i.scheduled_at ASC`,
        [userId],
      )
      .then((res: any) => res.rows);

    return NextResponse.json(interviews_query_result);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 },
    );
  }
}
