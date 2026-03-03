export async function createApplication(job_pub_id: string, pitch: string) {
  if (!job_pub_id || !pitch) {
    throw new Error("Missing required fields");
  }

  const response = await fetch("/api/applicant/jobs/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_pub_id: job_pub_id, pitch: pitch }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  const data = await response.json();
  return data;
}
