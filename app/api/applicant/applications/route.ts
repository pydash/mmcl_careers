import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserRole, getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const role = await getUserRole();

    if (!role || role !== "APPLICANT")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = await getUserId();

    const result = await sql`
      SELECT a.id, jp.title, jp.department, a.status, a.created_at
      FROM applications a
      JOIN job_posts jp ON a.job_id = jp.id
      WHERE profile_id = ${id}
    `;

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
