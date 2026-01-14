import { NextResponse } from "next/server";
import db from "@/lib/db";
import { insertNewAccountQuery } from "@/lib/queries/applicant/insertNewAccountQuery";

export async function POST(request: Request) {
  try {
    const applications = await db
      .query(insertNewAccountQuery)
      .then((res: any) => res.rows);

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error creating new account ", error);
    return NextResponse.json(
      { error: "Failed to create new account" },
      { status: 500 }
    );
  }
}
