import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserId, getUserRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const id = await getUserId();
    const role = await getUserRole();

    if (!id || role !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const status = searchParams.get("status") || "";

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 8;

    const offset = (page - 1) * limit;

    const filters = [];
    const values = [];

    if (search) {
      values.push(`%${search}`);
      filters.push(`title ILIKE $${values.length}`);
    }

    if (department) {
      values.push(department);
      filters.push(`department = $${values.length}`);
    }

    if (status) {
      values.push(status);
      filters.push(`status = $${values.length}`);
    }

    const whereClause =
      filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    values.push(limit);
    values.push(offset);

    const jobs = await sql`
      SELECT *
      FROM job_posts
      WHERE
        (${search === ""} OR title ILIKE ${"%" + search + "%"})
        AND (${department === ""} OR department = ${department})
        AND (${status === ""} OR status = ${status})
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const totalResult = await sql`
      SELECT COUNT(*) AS total
      FROM job_posts
      WHERE
        (${search === ""} OR title ILIKE ${"%" + search + "%"})
        AND (${department === ""} OR department = ${department})
        AND (${status === ""} OR status = ${status})
    `;

    const total = Number(totalResult[0].total);

    return NextResponse.json(
      {
        jobs,
        total,
        totalPages: Math.ceil(total / limit),
        page,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
