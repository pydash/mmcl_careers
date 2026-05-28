import type { PublicJobs } from "@/types/job";

export async function getJobs(): Promise<PublicJobs[] | null> {
  const res = await fetch("/api/jobs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}
