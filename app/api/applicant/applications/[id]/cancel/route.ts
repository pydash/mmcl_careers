import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserId, getUserRole } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id: applicationId } = await params;
    const userId = await getUserId();
    const role = await getUserRole();

    if (!userId || role !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const update_status_result = await sql`
      UPDATE applications
      SET status = 'Cancelled'
      where id = ${applicationId}
      RETURNING id;
    `;

    if (update_status_result.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    const cancel_message = "You cancelled your application.";
    const cancel_status = "Cancelled";

    await sql`
      INSERT INTO application_stage_history (application_id, stage, status)
      VALUES (${applicationId}, ${cancel_message}, ${cancel_status})
    `;

    return NextResponse.json({
      message: "Cancelled successfully",
      application: update_status_result[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to cancel application" },
      { status: 500 },
    );
  }
}
