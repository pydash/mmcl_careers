import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

type Params = Promise<{ credentialId: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { credentialId } = await params;
    console.log("Credential ID to delete:", credentialId);
    console.log("User ID from session:", userId);

    if (!credentialId) {
      return NextResponse.json(
        { error: "Credential ID is required" },
        { status: 400 },
      );
    }

    const result = await db.query(
      "DELETE FROM credentials WHERE id = $1 AND profile_id = $2",
      [credentialId, userId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Credential record not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting credential:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
