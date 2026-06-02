import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserId, getUserRole } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { pitch } = await req.json();
    const userId = await getUserId();
    const role = await getUserRole();

    if (!role || role !== "APPLICANT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const jobId = await sql`
        SELECT id
        FROM job_posts
        WHERE public_id = ${id}
    `;

    await sql`
        INSERT INTO applications(profile_id, job_id, pitch)
        VALUES (${userId}, ${jobId}, ${pitch})
    `;

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
