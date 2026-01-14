import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const result = await db.query(
      `SELECT id, title, description, created_at, is_active
       FROM job_posts WHERE id = $1`,
      [id]
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const allowedFields = {
      title: (val: any) => typeof val === "string",
      description: (val: any) => typeof val === "string" || val === null,
      is_active: (val: any) => typeof val === "boolean",
    };

    const updates = Object.entries(allowedFields)
      .filter(([field, validator]) => field in body && validator(body[field]))
      .map(([field], i) => `${field} = $${i + 1}`);

    if (updates.length === 0) {
      return NextResponse.json({ error: "No valid fields" }, { status: 400 });
    }

    const values = Object.keys(allowedFields)
      .filter(
        (field) =>
          field in body &&
          allowedFields[field as keyof typeof allowedFields](body[field])
      )
      .map((field) => body[field]);

    const sql = `UPDATE job_posts SET ${updates.join(", ")}
                 WHERE id = $${updates.length + 1}
                 RETURNING id, title, description, created_at, is_active`;

    const result = await db.query(sql, [...values, id]);
    return NextResponse.json(result.rows[0]);
  } catch (e) {
    console.error("Error updating job", e);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}
