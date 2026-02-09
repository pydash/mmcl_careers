import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // Test basic connection
    const result = await db.query("SELECT NOW()");
    const dbTime = result.rows[0].now;

    // Count applications
    const appCount = await db.query("SELECT COUNT(*) as count FROM job_applications");
    const count = appCount.rows[0].count;

    // Get sample data
    const sample = await db.query("SELECT * FROM job_applications LIMIT 5");

    return NextResponse.json({
      status: "ok",
      dbTime,
      applicationCount: count,
      sample: sample.rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        code: error.code,
        detail: error.detail,
      },
      { status: 500 }
    );
  }
}
