import { type PostJobData, type PostJobResponse } from "@/models/PostJob";

export async function postJob(data: PostJobData): Promise<PostJobResponse> {
  const response = await fetch("/api/hr/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to post job");
  }

  const result = await response.json();
  return {
    success: true,
    jobId: result.id,
  };
}
