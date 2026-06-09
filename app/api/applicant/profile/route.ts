import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserRole, getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserId();
    const role = await getUserRole();

    if (!role || role !== "APPLICANT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const profileRecord = await sql`
    SELECT id
    FROM user_profiles
    WHERE id = ${userId}
    `;

    if (profileRecord.length === 0) {
      return NextResponse.json(
        { message: "No profile record" },
        { status: 200 },
      );
    }

    const profileDetails = await sql`
    SELECT jsonb_build_object(
        'profile', to_jsonb(up) - 'created_at' - 'updated_at',

        'social', COALESCE(
        (
            SELECT jsonb_agg(to_jsonb(us))
            FROM user_socials us
            WHERE us.id = up.id
        ),
        '[]'::jsonb
        ),

        'education', COALESCE(
        (
            SELECT jsonb_agg(to_jsonb(eb) - 'created_at')
            FROM educational_backgrounds eb
            WHERE eb.profile_id = up.id
        ),
        '[]'::jsonb
        ),

        'employment', COALESCE(
        (
            SELECT jsonb_agg(to_jsonb(eh) - 'created_at')
            FROM employment_histories eh
            WHERE eh.profile_id = up.id
        ),
        '[]'::jsonb
        ),

        'credentials', COALESCE(
        (
            SELECT jsonb_agg(to_jsonb(cred) - 'created_at')
            FROM credentials cred
            WHERE cred.profile_id = up.id
        ),
        '[]'::jsonb
        ),
        
        'govids', COALESCE(
        (
            SELECT jsonb_agg(to_jsonb(gi) - 'created_at')
            FROM government_ids gi
            WHERE gi.profile_id = up.id
        ),
        '[]'::jsonb
        )
    ) AS result
    FROM user_profiles up
    WHERE up.id = ${userId};
    `;

    return NextResponse.json(profileDetails[0].result, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}
