export async function fetchJobDetails(jobId: string) {
  const response = await fetch(`/api/applicant/jobs/${jobId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }

  const data = await response.json();
  return data;
}
