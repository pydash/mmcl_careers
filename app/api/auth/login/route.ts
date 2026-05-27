import { sql } from "@/lib/db";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Empty credentials" }, { status: 400 });
  }

  // 1. find user
  const users = await sql`
    SELECT * FROM user_accounts WHERE email = ${email}
  `;

  const user = users[0];
  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 400 });
  }

  // 2. compare password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return Response.json({ error: "Invalid credentials" }, { status: 400 });
  }

  // 3. create JWT
  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // 4. set cookie
  return new Response(JSON.stringify({ message: "Logged in" }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
    },
  });
}
