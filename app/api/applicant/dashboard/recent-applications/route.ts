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

    const recent_applications_query_result = await db
      .query(
        "SELECT ja.id, j.title as position, ja.status, ja.applied_at as dateapplied FROM job_applications ja JOIN job_posts j ON ja.job_id = j.id WHERE ja.acc_id = $1 ORDER BY applied_at DESC LIMIT 5;",
        [userId]
      )
      .then((res: any) => res.rows);

    return NextResponse.json(recent_applications_query_result);
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent applications" },
      { status: 500 }
    );
  }
}
