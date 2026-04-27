import { JobFormData } from "@/models/Job";

type PostJobResponse = {
  success: boolean;
  jobId?: string;
  error?: string;
};

export async function postJob(data: JobFormData): Promise<PostJobResponse> {
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
