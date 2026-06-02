import type { PublicJob } from "@/types/job";

export async function getJob(id: string): Promise<PublicJob | null> {
  const res = await fetch(`/api/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}
