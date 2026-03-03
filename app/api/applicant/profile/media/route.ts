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
    const { platform, link } = body;

    const query = `
      INSERT INTO media_accounts (profile_id, platform, link)
      VALUES ($1, $2, $3)
    `;

    const result = await db.query(query, [userId, platform, link]);
    const newMediaAccount = result.rows[0];

    return NextResponse.json(
      { success: true, media_account: newMediaAccount },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating media account:", error);
    return NextResponse.json(
      { error: "Failed to create media account" },
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
    const { media_accounts } = body;

    if (!Array.isArray(media_accounts)) {
      return NextResponse.json(
        { error: "media_accounts must be an array" },
        { status: 400 },
      );
    }

    for (const account of media_accounts) {
      const { platform, link } = account;

      const query = `
        UPDATE media_accounts
        SET platform = $1, link = $2
        WHERE profile_id = $3
      `;

      await db.query(query, [platform, link, userId]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating media accounts:", error);
    return NextResponse.json(
      { error: "Failed to update media accounts" },
      { status: 500 },
    );
  }
}
