import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT 
        ja.id, 
        up.first_name, 
        up.last_name, jp.title, ja.status, ua.email
      FROM job_applications ja
      LEFT JOIN job_posts jp ON ja.job_id = jp.id
      LEFT JOIN user_accounts ua ON ja.acc_id = ua.id
      LEFT JOIN user_profiles up ON ua.id = up.id
      WHERE ja.status = 'Offered'
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching offers", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 },
    );
  }
}
