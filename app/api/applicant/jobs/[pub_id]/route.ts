import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { JobPost } from "@/models/Job";
import { getJobPostDetails } from "@/lib/queries/applicant/jobs";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { pub_id: string } },
) {
  try {
    const userId = getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pub_id } = await params;

    const result = await db
      .query<JobPost>(getJobPostDetails, [pub_id])
      .then((res: any) => res.rows);

    if (!result || result.length === 0) {
      console.log("API Route - No job found for pub_id:", pub_id);
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("API Route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job details" },
      { status: 500 },
    );
  }
}
