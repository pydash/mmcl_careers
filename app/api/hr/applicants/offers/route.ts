import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(`
      SELECT 
        a.id,
        up.first_name,
        up.last_name,
        jp.position AS title,
        a.created_at AS offered_at,
        a.status,
        up.email_address
      FROM applications a
      LEFT JOIN user_profiles up ON up.id = a.profile_id
      LEFT JOIN job_postings jp ON jp.id = a.job_id
      WHERE a.status = 'Offered'
      ORDER BY a.created_at DESC
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
