import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getJobPostDetails } from "@/lib/queries/applicant/jobs/job_post_detail";
import { getSessionToken } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(getJobPostDetails, [id]);
    const jobDetails = result?.rows?.[0];

    if (!jobDetails) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(jobDetails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch job details" },
      { status: 500 },
    );
  }
}
