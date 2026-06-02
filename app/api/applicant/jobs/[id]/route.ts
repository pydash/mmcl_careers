import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserRole } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const role = await getUserRole();

    if (!role || role !== "APPLICANT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const job = await sql`
      SELECT *
      FROM job_posts
      WHERE public_id = ${id}
    `;

    return NextResponse.json(job[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);

    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}
