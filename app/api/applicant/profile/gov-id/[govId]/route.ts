import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

type Params = Promise<{ govId: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { govId } = await params;

    const query = `
      DELETE FROM government_ids
      WHERE id = $1 AND profile_id = $2
    `;

    await db.query(query, [govId, userId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting government ID:", error);
    return NextResponse.json(
      { error: "Failed to delete government ID" },
      { status: 500 },
    );
  }
}
