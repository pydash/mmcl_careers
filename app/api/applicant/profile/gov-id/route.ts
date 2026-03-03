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
    const { id_type, id_number } = body;

    const query = `
      INSERT INTO government_ids (profile_id, id_type, id_number)
      VALUES ($1, $2, $3)
      RETURNING id, profile_id, id_type, id_number, created_at, updated_at
    `;

    const result = await db.query(query, [userId, id_type, id_number]);
    const newGovId = result.rows[0];

    return NextResponse.json(
      { success: true, government_id: newGovId },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating government ID:", error);
    return NextResponse.json(
      { error: "Failed to create government ID" },
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
    const { government_ids } = body;

    if (!Array.isArray(government_ids)) {
      return NextResponse.json(
        { error: "government_ids must be an array" },
        { status: 400 },
      );
    }

    for (const govId of government_ids) {
      const { id_type, id_number } = govId;

      const query = `
        UPDATE government_ids
        SET id_type = $1, id_number = $2
        WHERE profile_id = $3
      `;

      await db.query(query, [id_type, id_number, userId]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating government IDs:", error);
    return NextResponse.json(
      { error: "Failed to update government IDs" },
      { status: 500 },
    );
  }
}
