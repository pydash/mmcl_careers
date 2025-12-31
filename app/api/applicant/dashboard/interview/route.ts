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
        "SELECT ja.id AS application_id, ja.job_title, ji.interview_date, ji.interview_time, ji.location, ji.instructions FROM job_interview ji JOIN job_applications ja ON ji.app_id = ja.id WHERE ja.acc_id = $1 AND ji.interview_date >= NOW() ORDER BY ji.interview_date ASC;",
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
