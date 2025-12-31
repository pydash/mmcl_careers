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

    const overview_query_result = await db
      .query(
        "SELECT COUNT(*) FILTER (WHERE ja.acc_id = $1) AS total_applications, COUNT(*) FILTER (WHERE ja.acc_id = $1 AND ja.status = 'pending') AS pending_applications, COUNT(*) FILTER (WHERE ja.acc_id = $1 AND ja.status = 'interview_scheduled') AS interviews_scheduled FROM job_applications ja;",
        [userId]
      )
      .then((res: any) => res.rows[0]);

    return NextResponse.json(overview_query_result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
