import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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
