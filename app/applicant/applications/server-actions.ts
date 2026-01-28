"use server";

import pool from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getApplications() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("session_email")?.value;

    if (!email) {
      console.error("No session email found");
      return [];
    }

    const userResult = await pool.query(
      "SELECT id FROM user_accounts WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      console.error("User not found");
      return [];
    }

    const userId = userResult.rows[0].id;

    const result = await pool.query(
      `SELECT
        ja.id,
        ja.id as app_number,
        ja.status,
        jp.title as position,
        jp.description,
        ja.applied_at as applied_date,
        ja.pitch
       FROM job_applications ja
       JOIN job_posts jp ON ja.job_id = jp.id
       WHERE ja.acc_id = $1
       ORDER BY ja.applied_at DESC`,
      [userId]
    );

    return result.rows;
  } catch (error: unknown) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function getProfile() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("session_email")?.value;

    if (!email) {
      console.error("No session email found");
      return null;
    }

    const userResult = await pool.query(
      "SELECT id FROM user_accounts WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      console.error("User not found");
      return null;
    }

    const userId = userResult.rows[0].id;

    const profileResult = await pool.query(
      `SELECT * FROM user_profiles WHERE id = $1`,
      [userId]
    );

    return profileResult.rows[0] || null;
  } catch (error: unknown) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function cancelApplication(appId: number) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("session_email")?.value;

   if (!email) {
      throw new Error("Unauthorized");
    }

    const userResult = await pool.query(
      "SELECT id FROM user_accounts WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }

    const userId = userResult.rows[0].id;

    await pool.query(
      `
      UPDATE job_applications
      SET status = 'Cancelled'
      WHERE id = $1 AND acc_id = $2
      `,
      [appId, userId]
    );

    revalidatePath("/applications");
  } catch (error) {
    console.error("Error cancelling application:", error);
    throw error;
  }
}