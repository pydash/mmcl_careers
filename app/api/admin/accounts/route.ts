import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getAllAccountsQuery } from "@/lib/queries/admin/accounts/query";
import { getUserIdFromSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(getAllAccountsQuery);
    const accounts = result.rows ?? [];

    return NextResponse.json({
      success: true,
      accounts,
      total: accounts.length,
    });
  } catch (error) {
    console.error("Error fetching hr accounts", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let transactionStarted = false;

  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, first_name, last_name } = body;

    // Generate a default password
    const defaultPassword = "ChangeMe123!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Insert into user_accounts
    const insertAccountQuery = `
      INSERT INTO user_accounts (email, password_hash, role)
      VALUES ($1, $2, 'hr')
      RETURNING id, email, created_at
    `;
    const accountResult = await db.query(insertAccountQuery, [
      email,
      hashedPassword,
    ]);

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    // Only rollback if transaction was started
    if (transactionStarted) {
      try {
        await db.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Error rolling back transaction", rollbackError);
      }
    }
    console.error("Error creating hr account", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 },
    );
  }
}
