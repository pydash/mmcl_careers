import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { Applicant } from "@/models/User";
import {
  getApplicantDetails,
  getIdFromJobPublicId,
  createApplication,
} from "@/lib/queries/applicant/jobs";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicant_result = await db
      .query<Applicant>(getApplicantDetails, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(applicant_result);
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
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const jobId = await db
      .query(getIdFromJobPublicId, [body.job_pub_id])
      .then((res: any) => res.rows[0].id);
    const pitch = body.pitch;

    if (!jobId || !pitch) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await db.query(createApplication, [userId, jobId, pitch]);

    if (!response) {
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting application", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
