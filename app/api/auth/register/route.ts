import { sql } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO user_accounts (email, password)
    VALUES (${email}, ${hashedPassword})
  `;

  return Response.json({ message: "User created" });
}
