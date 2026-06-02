import type { UserProfileResponse } from "@/types/user";

export async function getProfile(): Promise<UserProfileResponse> {
  const res = await fetch("/api/applicant/profile", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}
