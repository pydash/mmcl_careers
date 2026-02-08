import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const total_applications = await db
      .query("SELECT COUNT(*) FROM job_applications WHERE acc_id = $1;", [
        userId,
      ])
      .then((res: any) => res.rows[0]);

    const pending_applications = await db
      .query(
        "SELECT COUNT(*) FROM job_applications WHERE acc_id = $1 AND status = 'Pending';",
        [userId]
      )
      .then((res: any) => res.rows[0]);

    const interview_count = await db
      .query(
        "SELECT COUNT(*) FROM job_interviews ji JOIN job_applications ja ON ji.app_id = ja.id WHERE ja.acc_id = $1 AND ji.scheduled_at >= NOW();",
        [userId]
      )
      .then((res: any) => res.rows[0]);

    const overview_query_result = {
      total_applications: total_applications.count,
      pending_applications: pending_applications.count,
      upcoming_interviews: interview_count.count,
    };

    return NextResponse.json(overview_query_result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
