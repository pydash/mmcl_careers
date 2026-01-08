import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { JobPostItemDetail } from "@/models/job-posts/job-post.detail";
import { JOB_POST_ITEM_DETAIL_QUERY } from "@/lib/queries/applicant/jobs/job_post_detail";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db
      .query<JobPostItemDetail>(JOB_POST_ITEM_DETAIL_QUERY, [id])
      .then((res: any) => res.rows);

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch job details" },
      { status: 500 }
    );
  }
}
