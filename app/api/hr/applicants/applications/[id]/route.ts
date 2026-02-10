import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getProfileDetails } from "@/lib/queries/applicant/profile/profile_details";
import { ProfileResponse } from "@/models/applicant/Profile";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const allowedFields = {
      status: (val: any) => typeof val === "string",
      notes: (val: any) => typeof val === "string" || val === null,
    };

    const updates = Object.entries(allowedFields)
      .filter(([field, validator]) => field in body && validator(body[field]))
      .map(([field], i) => `${field} = $${i + 1}`);

    if (updates.length === 0) {
      return NextResponse.json({ error: "No valid fields" }, { status: 400 });
    }

    const allowedStatuses = ["Pending", "For interview", "Deferred", "Offered"] as const;

    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const values = Object.keys(allowedFields)
      .filter(
        (field) =>
          field in body &&
          allowedFields[field as keyof typeof allowedFields](body[field]),
      )
      .map((field) => body[field]);

    const sql = `UPDATE job_applications SET ${updates.join(", ")}
                 WHERE id = $${updates.length + 1}
                 RETURNING id, status`;

    const result = await db.query(sql, [...values, id]);
    return NextResponse.json(result.rows[0]);
  } catch (e) {
    console.error("Error updating job", e);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}
