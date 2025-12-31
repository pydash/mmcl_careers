import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews_query_result = await db
      .query(
        "SELECT ji.title, ji.interview_mode as mode, ji.scheduled_at as schedule  FROM job_interviews as ji JOIN job_applications as ja ON ji.app_id = ja.id WHERE ja.acc_id = $1 AND ji.scheduled_at >= NOW() ORDER BY ji.scheduled_at ASC;",
        [userId]
      )
      .then((res: any) => res.rows);

    return NextResponse.json(interviews_query_result);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}
