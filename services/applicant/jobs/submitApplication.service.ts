export async function pushSubmitApplication(jobId: string, pitch: string) {
  const response = await fetch("/api/applicant/jobs/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: jobId, pitch }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  const data = await response.json();
  return data;
}
