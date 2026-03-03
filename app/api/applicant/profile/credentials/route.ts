import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { title, authority, number, date_taken, valid_until } = body;

    const query = `
      INSERT INTO credentials (
        profile_id,
        title,
        authority,
        number,
        date_taken,
        valid_until
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const result = await db.query(query, [
      userId,
      title,
      authority,
      number,
      date_taken,
      valid_until,
    ]);

    return NextResponse.json({
      success: true,
      credential: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error adding credential:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add credential" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { credentials } = body;

    if (!Array.isArray(credentials)) {
      return NextResponse.json(
        { error: "Credentials data must be an array" },
        { status: 400 },
      );
    }

    // Update each credential in the array
    for (const credential of credentials) {
      const { title, authority, number, date_taken, valid_until } = credential;

      const query = `
        UPDATE credentials
        SET title = $1,
            authority = $2,
            number = $3,
            date_taken = $4,
            valid_until = $5
        WHERE profile_id = $6
      `;

      await db.query(query, [
        title,
        authority,
        number,
        date_taken,
        valid_until,
        userId,
      ]);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error updating credentials:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update credentials" },
      { status: 500 },
    );
  }
}
