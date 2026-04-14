import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .query(
        "SELECT id, title, expiry_date FROM job_posts ORDER BY expiry_date DESC LIMIT 4 ",
      )
      .then((res: any) => res.rows);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
