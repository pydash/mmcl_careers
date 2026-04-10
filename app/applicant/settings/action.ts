"use server";

import db from "@/lib/db";
// import {hash} from "bcryptjs"
import { cookies } from "next/headers";

type SettingsState = { error?: string | null };

async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value ?? null;
}

/* ================= GET SETTINGS ================= */
export async function getSettings() {
  const userId = await getUserIdFromCookie();
  if (!userId) return null;

  const result = await db.query(
    `
    SELECT 
      u.email,
      s.theme_preference,
      s.email_notifications,
      s.system_notifications
    FROM user_accounts u
    LEFT JOIN user_settings s ON u.id = s.id
    WHERE u.id = $1
    `,
    [userId],
  );

  if (!result.rows.length) return null;

  const user = result.rows[0];

  return {
    email: user.email,
    theme_preference: user.theme_preference ?? "light",
    email_notifications: user.email_notifications ?? true,
    system_notifications: user.system_notifications ?? true,
  };
}

/* ================= UPDATE ACCOUNT ================= */
export async function updateAccount(
  prevState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const userId = await getUserIdFromCookie();
  if (!userId) return { error: "Unauthorized request." };

  const email = (formData.get("email") as string | null)?.trim();
  const password = formData.get("password") as string | null;

  if (!email) return { error: "Email is required." };

  try {
    if (password && password.length > 0) {
      // const hashed = await hashPassword(password);
      const hashed = "hashed_password_placeholder"; // Replace with actual hashing logic

      await db.query(
        `UPDATE user_accounts
         SET email = $1,
             password_hash = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3`,
        [email, hashed, userId],
      );
    } else {
      await db.query(
        `UPDATE user_accounts
         SET email = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [email, userId],
      );
    }

    return { error: null };
  } catch (error: any) {
    if (error?.code === "23505") {
      return { error: "Email already exists." };
    }

    return { error: "Failed to update account." };
  }
}

/* ================= UPSERT PREFERENCES ================= */
export async function updatePreferences(
  prevState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const userId = await getUserIdFromCookie();
  if (!userId) return { error: "Unauthorized request." };

  const theme = (formData.get("theme") as string) ?? "light";
  const emailNotifications = formData.get("emailNotifications") === "on";
  const systemNotifications = formData.get("systemNotifications") === "on";

  try {
    await db.query(
      `
      INSERT INTO user_settings (
        id,
        theme_preference,
        email_notifications,
        system_notifications
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        theme_preference = EXCLUDED.theme_preference,
        email_notifications = EXCLUDED.email_notifications,
        system_notifications = EXCLUDED.system_notifications,
        updated_at = CURRENT_TIMESTAMP
      `,
      [userId, theme, emailNotifications, systemNotifications],
    );

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update preferences." };
  }
}
