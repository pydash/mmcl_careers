import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSessionToken } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: applicationId } = await params;
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      `
      UPDATE applications
      SET status = 'Cancelled'
      WHERE id = $1
      RETURNING *
    `,
      [applicationId],
    );

    const application = result?.rows?.[0];

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Application cancelled successfully",
      application,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to cancel application" },
      { status: 500 },
    );
  }
}
