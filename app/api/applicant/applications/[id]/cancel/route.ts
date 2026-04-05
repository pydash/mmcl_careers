import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a PostgreSQL pool (Neon)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const applicationId = params.id;

    const query = `
      UPDATE applications
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [applicationId]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Application cancelled successfully",
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Cancel error:", error);

    return NextResponse.json(
      { error: "Failed to cancel application" },
      { status: 500 }
    );
  }
}