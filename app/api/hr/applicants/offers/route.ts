import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT id, first_name, last_name, title, offered_at, status, email
      FROM applications
      WHERE status = 'Offered'
      ORDER BY offered_at DESC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching offers", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}
