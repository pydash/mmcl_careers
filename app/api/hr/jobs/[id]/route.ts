import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      `SELECT 
    jp.title, 
    jp.department, 
    jp.employment_type, 
    jp.teaching_type,
    jp.description, 
    jp.responsibilities, 
    jp.requirements,
    jp.salary,
    CONCAT(up.first_name, ' ', up.last_name) AS posted_by,
    jp.created_at, 
    jp.status,
    (SELECT COUNT(*) FROM applications a WHERE a.job_id = jp.id) AS application_count,
    jp.expiry_date
    FROM job_posts jp
    LEFT JOIN user_profiles up ON jp.posted_by = up.id
    WHERE jp.public_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching job details:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const result = await db.query(
      `
      UPDATE job_posts
      SET title = $1,
          department = $2,
          employment_type = $3,
          teaching_type = $4,
          salary = $5,
          expiry_date = $6,
          status = $7,
          description = $8,
          responsibilities = $9,
          requirements = $10
      WHERE public_id = $11
      `,
      [
        data.title,
        data.department,
        data.employment_type,
        data.teaching_type,
        data.salary,
        data.expiry_date,
        data.status,
        data.description,
        data.responsibilities,
        data.requirements,
        id,
      ],
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job details:", error);
    return NextResponse.json(
      { error: "Failed to update job details" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      `DELETE FROM job_posts
       WHERE public_id = $1
       RETURNING id`,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 },
    );
  }
}
