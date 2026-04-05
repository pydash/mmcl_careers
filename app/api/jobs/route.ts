import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "@/lib/auth";
import db from "@/lib/db";
import { Job } from "@/models/job";
import { getAllJobs } from "@/lib/query/get-jobs";

export async function GET(request: NextRequest) {
  try {
    const userRole = await getUserRole();
    if (!userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(getAllJobs);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { role, department, type, teaching_type, posted } = body;
    if (!role || !department || !type || !teaching_type || !posted) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create new job with mock ID
    const newJob: Job = {
      id: mockJobs.length + 1,
      ...body,
    };

    mockJobs.push(newJob);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}
