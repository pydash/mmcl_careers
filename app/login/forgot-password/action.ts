// app/forgot-password/actions.ts
"use server";

import crypto from "crypto";
import pool from "@/lib/db"; // Prisma / SQL client
import { sendResetEmail } from "@/lib/email";

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email") as string;

  const user = await pool.user_accounts.findUnique({
    where: { email },
    include: { user_security: true },
  });

  // Always succeed (prevents email enumeration)
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await pool.user_security.upsert({
    where: { id: user.id },
    update: {
      reset_token: hashedToken,
      token_expiry: expiry,
      updated_at: new Date(),
    },
    create: {
      id: user.id,
      reset_token: hashedToken,
      token_expiry: expiry,
    },
  });

  const link = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await sendResetEmail(user.email, link);
}
