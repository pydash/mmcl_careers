import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

type Params = Promise<{ workId: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { workId } = await params;
    console.log("Work ID to delete:", workId);
    console.log("User ID from session:", userId);

    if (!workId) {
      return NextResponse.json(
        { error: "Work ID is required" },
        { status: 400 },
      );
    }

    const result = await db.query(
      "DELETE FROM work_experiences WHERE id = $1 AND profile_id = $2",
      [workId, userId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Work record not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting work experience:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
