import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume_query_result = await db
      .query(
        "SELECT id, file_name, file_size, file_url, updated_at as uploaded_at FROM user_attachments WHERE acc_id = $1 AND file_type = 'resume' ORDER BY updated_at DESC LIMIT 1;",
        [userId]
      )
      .then((res: any) => res.rows);

    return NextResponse.json(resume_query_result);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}
