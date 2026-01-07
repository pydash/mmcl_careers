import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ProfileResponse } from "@/models/applicant/Profile";
import { APPLICANT_PROFILE_QUERY } from "@/lib/queries/applicant/profile";
import { INSERT_APPLICATION_QUERY } from "@/lib/queries/applicant/jobs/apply/insert_application";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs_query_result = await db
      .query<ProfileResponse>(APPLICANT_PROFILE_QUERY, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(jobs_query_result);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const jobId = body.jobId ?? body.job_id;
    const pitch = body.pitch;

    if (!jobId || !pitch) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(INSERT_APPLICATION_QUERY, [userId, jobId, pitch]);

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting application", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
