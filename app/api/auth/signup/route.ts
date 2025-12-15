import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, role_id } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const checkUser = await pool.query(
      "SELECT email FROM user_accounts WHERE email = $1 LIMIT 1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email is already registered." },
        { status: 409 }
      );
    }

    // Create random salt
    const salt = bcrypt.genSaltSync(10);

    // Hash password + salt
    const passwordHash = bcrypt.hashSync(password + salt, 10);

    // Insert new user
    const insertQuery = `
      INSERT INTO user_accounts (email, password_hash, salt, role_id)
      VALUES ($1, $2, $3, $4)
      RETURNING account_id, email, role_id, created_at
    `;

    const newUser = await pool.query(insertQuery, [
      email,
      passwordHash,
      salt,
      role_id || 1, // default role = 1 (maybe applicant)
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: newUser.rows[0].account_id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
