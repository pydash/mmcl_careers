import type { ApplicantJob } from "@/types/job";

export async function getJob(id: string): Promise<ApplicantJob | null> {
  const res = await fetch(`/api/applicant/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}
