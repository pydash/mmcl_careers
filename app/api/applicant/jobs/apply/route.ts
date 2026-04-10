import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { APPLICANT_PROFILE_QUERY } from "@/lib/queries/applicant/profile";
import { INSERT_APPLICATION_QUERY } from "@/lib/queries/applicant/jobs/apply/insert_application";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs_query_result = await db
      .query(APPLICANT_PROFILE_QUERY, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(jobs_query_result);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = await db.query(
      "SELECT id FROM job_posts WHERE public_id = $1",
      [body.job_id],
    );
    const jobId = result.rows[0]?.id;
    const pitch = body.pitch;

    if (!jobId || !pitch) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db.query(INSERT_APPLICATION_QUERY, [userId, jobId, pitch]);

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
