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

    const jobs_query_result = await db
      .query(
        "SELECT id, title, department, employment_type, salary_min, salary_max, is_active, expiry_date FROM job_posts WHERE is_active = true"
      )
      .then((res: any) => res.rows);

    return NextResponse.json(jobs_query_result);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
