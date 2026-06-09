import type { ProfileDetails } from "@/types/user";

export async function getProfile(): Promise<ProfileDetails> {
  const res = await fetch("/api/applicant/profile", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}
