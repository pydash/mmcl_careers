import type { ApplicantJobs } from "@/types/job";

type GetJobsParams = {
  search?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
};

type JobsResponse = {
  jobs: ApplicantJobs[];
  total: number;
  totalPages: number;
  page: number;
};

export async function getJobs({
  search = "",
  department = "",
  status = "",
  page = 1,
  limit = 8,
}: GetJobsParams): Promise<JobsResponse> {
  const params = new URLSearchParams({
    search,
    department,
    status,
    page: String(page),
    limit: String(limit),
  });
  const res = await fetch(`/api/applicant/jobs?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

export async function createJobApplication(
  id: string,
  payload: { pitch: string },
) {
  const response = await fetch(`/api/applicant/jobs/${id}/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}
