import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";
import {
  getOpenRolesStats,
  getNewApplicantsStats,
  getInterviewsScheduledStats,
  getOffersMadeStats,
  getPipelineHealthStats,
} from "@/lib/queries/hr/dashboard";
import { get } from "http";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const openRolesResult = await db.query(getOpenRolesStats);
    const open_roles = openRolesResult.rows[0];

    const newApplicantResult = await db.query(getNewApplicantsStats);
    const new_applicants = newApplicantResult.rows[0];

    const interviewsScheduledResult = await db.query(
      getInterviewsScheduledStats,
    );
    const interviews_scheduled = interviewsScheduledResult.rows[0];

    const offersMadeResult = await db.query(getOffersMadeStats);
    const offers_made = offersMadeResult.rows[0];

    const pipelineHealthResult = await db.query(getPipelineHealthStats);
    const pipeline_health = pipelineHealthResult.rows[0];

    return NextResponse.json({
      stats: {
        open_roles,
        new_applicants,
        interviews_scheduled,
        offers_made,
      },
      pipeline_health: {
        applied: pipeline_health.applied,
        interview: pipeline_health.interview,
        offer: pipeline_health.offer,
      },
    });
  } catch (error) {
    console.error("Error fetching HR stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 },
    );
  }
}
