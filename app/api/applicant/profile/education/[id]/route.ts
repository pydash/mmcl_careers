import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";
import { deleteEducationEntry } from "@/lib/queries/applicant/profile";

type Params = Promise<{ id: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: educationId } = await params;
    console.log("Education ID to delete:", educationId);
    console.log("User ID from session:", userId);

    if (!educationId) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 },
      );
    }

    const result = await db.query(deleteEducationEntry, [educationId, userId]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Education record not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting education:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
