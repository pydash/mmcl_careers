import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ profile_id: string }> },
) {
  try {
    const { profile_id } = await params;
    const job_id = request.nextUrl.searchParams.get("job_id");
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!job_id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 },
      );
    }

    const result = await db.query(
      `
        SELECT json_build_object(
        'application', (
            SELECT json_build_object(
            'id', a.id,
            'title', jp.title,
            'pitch', a.pitch,
            'date_applied', a.created_at
            )
            FROM applications a
            JOIN job_posts jp ON a.job_id = jp.id
            WHERE a.job_id = $2 AND a.profile_id = $1
        ),
        'personal', (
            SELECT json_build_object(
            'honorific', up.honorific,
            'full_name', CONCAT(up.first_name, ' ', up.middle_name, ' ', up.last_name),
            'birthdate', up.birth_date,
            'sex', up.sex,
            'citizenship', up.citizenship,
            'civil_status', up.civil_status,
            'phone_number', up.phone_number,
            'physical_address', up.physical_address,
            'email_address', up.email_address,
            'about', up.about
            )
            FROM user_profiles up
            WHERE up.id = $1
        ),
        'education', COALESCE(
            (SELECT json_agg(
                json_build_object(
                'degree', eb.degree,
                'institution', eb.institution,
                'course', eb.course,
                'status', eb.status,
                'units_earned', eb.units_earned,
                'year_finished', eb.year_finished,
                'honors', eb.honors
                )
                ORDER BY eb.year_finished DESC NULLS LAST
            )
            FROM educational_backgrounds eb
            WHERE eb.profile_id = $1
            ), '[]'::json),
        'employment', COALESCE(
            (
            SELECT json_agg(
                json_build_object(
                'position', eh.position,
                'specialization', eh.specialization,
                'company', eh.company,
                'industry', eh.industry,
                'salary', eh.monthly_salary,
                'date_started', eh.date_started,
                'date_ended', eh.date_ended,
                'courses_handled', eh.courses_handled
                )
            )
            FROM employment_histories eh
            WHERE eh.profile_id = $1
            ), '[]'::json
        ),
        'licenses', COALESCE(
            (
            SELECT json_agg(
                json_build_object(
                'title', lc.title,
                'organization', lc.issuing_organization,
                'number', lc.number,
                'date_issued', lc.date_issued,
                'expiry_date', lc.expiry_date
                )
            )
            FROM license_certifications lc
            WHERE lc.profile_id = $1
            ), '[]'::json
        ),
        'govids', COALESCE(
            (
            SELECT json_agg(
                json_build_object(
                'type', gi.type,
                'number', gi.number,
                'authority', gi.issued_by,
                'date_issued', gi.issued_date,
                'expiry_date', gi.expiry_date
                )
            )
            FROM government_ids gi
            WHERE gi.profile_id = $1
            ), '[]'::json
        )
        ) AS response
      `,
      [profile_id, job_id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0].response);
  } catch (error) {
    console.error("Error fetching application details:", error);
    return NextResponse.json(
      { error: "Failed to fetch application details" },
      { status: 500 },
    );
  }
}
