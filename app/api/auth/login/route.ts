import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find user
    const query = "SELECT * FROM user_accounts WHERE email = $1 LIMIT 1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Compare password hash
    const passwordMatch = await bcrypt.compare(password + user.salt, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        account_id: user.account_id,
        email: user.email,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Update last login
    await pool.query(
      "UPDATE user_accounts SET last_login_at = NOW(), updated_at = NOW() WHERE account_id = $1",
      [user.account_id]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        token,
        user: {
          account_id: user.account_id,
          email: user.email,
          role_id: user.role_id,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
