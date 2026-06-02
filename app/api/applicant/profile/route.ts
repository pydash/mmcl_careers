import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserId, getUserRole } from "@/lib/auth";

export async function GET() {
  try {
    const id = await getUserId();
    const role = await getUserRole();

    if (!id || role !== "APPLICANT")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const result = await sql`
    SELECT jsonb_build_object(
        'profile', to_jsonb(up) - 'created_at' - 'updated_at' - 'id',
        'educational_backgrounds', (
            SELECT COALESCE(jsonb_agg(to_jsonb(eb) - 'created_at' - 'profile_id'), '[]'::jsonb)
            FROM educational_backgrounds eb
            WHERE eb.profile_id = up.id
        ),
        'employment_histories', (
            SELECT COALESCE(jsonb_agg(to_jsonb(eh) - 'created_at' - 'profile_id'), '[]'::jsonb)
            FROM employment_histories eh
            WHERE eh.profile_id = up.id
        ),
        'credentials', (
            SELECT COALESCE(jsonb_agg(to_jsonb(cr) - 'created_at' - 'profile_id'), '[]'::jsonb)
            FROM credentials cr
            WHERE cr.profile_id = up.id
        ),
        'government_ids', (
            SELECT COALESCE(jsonb_agg(to_jsonb(gi) - 'created_at' - 'profile_id'), '[]'::jsonb)
            FROM government_ids gi
            WHERE gi.profile_id = up.id
        ),
        'user_socials', (
            SELECT COALESCE(jsonb_agg(to_jsonb(us)), '[]'::jsonb)
            FROM user_socials us
            WHERE us.id = up.id
        )
    ) AS response
    FROM user_profiles up
    WHERE up.id = ${id};
    `;

    return NextResponse.json(result[0].response, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
