import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";
import { updatePersonalProfile } from "@/lib/queries/applicant/profile";

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      first_name,
      middle_name,
      last_name,
      gender,
      birth_place,
      civil_status,
      citizenship,
      religion,
      mobile_number,
      email_address,
      permanent_address,
      mailing_address,
      landline_number,
    } = body.profile;

    const response = await db.query(updatePersonalProfile, [
      first_name,
      middle_name,
      last_name,
      gender,
      birth_place,
      civil_status,
      citizenship,
      religion,
      mobile_number,
      email_address,
      permanent_address,
      mailing_address,
      landline_number,
      userId,
    ]);

    return NextResponse.json({
      success: true,
      profile: body.profile,
    });
  } catch (error: any) {
    console.error("Error updating personal profile:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update personal profile" },
      { status: 500 },
    );
  }
}
