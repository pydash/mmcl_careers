import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userRole = await getUserRole();
    const { id } = await params;
    if (!userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      "SELECT * FROM job_postings WHERE public_id = $1",
      [id],
    );

    if (!result.rows.length) {
      return NextResponse.json({ error: "Job not found", id }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// PUT /api/jobs/[public_id] - Update a job
export async function PUT(
  request: NextRequest,
  { params }: { params: { public_id: string } },
) {
  try {
    const userRole = await getUserRole();
    const { public_id } = params;
    const body = await request.json();

    if (!userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      "UPDATE job_postings SET position = $1, department = $2, employment_type = $3, description = $4, salary = $5, is_open = $6, expiration_date = $7, updated_at = NOW() WHERE public_id = $8 RETURNING *",
      [
        body.position,
        body.department,
        body.employment_type,
        body.description,
        body.salary,
        body.is_open,
        body.expiration_date,
        public_id,
      ],
    );

    if (!result.rows.length) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}

// DELETE /api/jobs/[public_id] - Delete a job
export async function DELETE(
  request: NextRequest,
  { params }: { params: { public_id: string } },
) {
  try {
    const userRole = await getUserRole();
    const { public_id } = params;

    if (!userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      "DELETE FROM job_postings WHERE public_id = $1 RETURNING *",
      [public_id],
    );

    if (!result.rows.length) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 },
    );
  }
}
