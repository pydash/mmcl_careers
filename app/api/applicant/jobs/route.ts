import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { JOB_POST_ITEM_LIST_QUERY } from "@/lib/queries/applicant/jobs/job_post_list";
import { JobPostItemList } from "@/models/job-posts/job-post.list";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs_query_result = await db
      .query<JobPostItemList>(JOB_POST_ITEM_LIST_QUERY, [userId])
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
