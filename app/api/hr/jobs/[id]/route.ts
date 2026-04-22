import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
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
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}
