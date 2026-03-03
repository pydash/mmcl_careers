import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const result = await db.query(
      `
      SELECT
        id,
        position,
        department,
        employment_type,
        description,
        salary,
        expiration_date,
        posted_by
      FROM job_postings
      WHERE id = $1;
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (e) {
    console.error("Error fetching job detail", e);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const allowedFields = {
      position: (val: any) => typeof val === "string",
      department: (val: any) => typeof val === "string" || val === null,
      employment_type: (val: any) => typeof val === "string" || val === null,
      description: (val: any) => typeof val === "string" || val === null,
      salary: (val: any) => typeof val === "string" || val === null,
      is_open: (val: any) => typeof val === "boolean",
    };

    const validFields = Object.keys(allowedFields).filter(
      (field) =>
        field in body &&
        allowedFields[field as keyof typeof allowedFields](body[field]),
    );

    if (validFields.length === 0) {
      return NextResponse.json({ error: "No valid fields" }, { status: 400 });
    }

    const updates = validFields.map((field, i) => `${field} = $${i + 1}`);
    const values = validFields.map((field) => body[field]);

    const sql = `UPDATE job_postings SET ${updates.join(", ")}
                 WHERE id = $${updates.length + 1}
                 RETURNING id, position, department, employment_type, description,
                   salary, expiration_date, posted_by, is_open`;

    const result = await db.query(sql, [...values, id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (e) {
    console.error("Error updating job", e);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}
