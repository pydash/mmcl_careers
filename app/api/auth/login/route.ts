// External
import bcrypt from "bcrypt";

// Internal
import { sql } from "@/lib/db";
import { signToken } from "@/lib/jwt";

/**
 * POST /api/auth/login
 * Authenticate user and set a session cookie with a signed JWT.
 */
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Empty credentials" }, { status: 400 });
  }

  // 1) find user
  const users = await sql`
    SELECT * FROM user_accounts WHERE email = ${email}
  `;

  const user = users[0];
  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 400 });
  }

  // 2) compare password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return Response.json({ error: "Invalid credentials" }, { status: 400 });
  }

  // 3) create JWT — include both `id` and `userId` for compatibility
  const token = signToken({
    id: user.id,
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // 4) set cookie
  return new Response(JSON.stringify({ message: "Logged in" }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
    },
  });
}
