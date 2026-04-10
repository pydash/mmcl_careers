import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getAllJobPost } from "@/lib/queries/applicant/jobs/job_post_list";
import { Job } from "@/models/Job";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .query<Job>(getAllJobPost, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
