import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

type Params = Promise<{ mediaId: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mediaId } = await params;

    const query = `
      DELETE FROM media_accounts
      WHERE id = $1 AND profile_id = $2
    `;

    await db.query(query, [mediaId, userId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media account:", error);
    return NextResponse.json(
      { error: "Failed to delete media account" },
      { status: 500 },
    );
  }
}
