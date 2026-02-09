export async function pushSubmitApplication(job_pub_id: string, pitch: string) {
  console.log("POST body:", {
    job_id: job_pub_id,
    pitch,
  });

  const response = await fetch("/api/applicant/jobs/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: job_pub_id, pitch }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  const data = await response.json();
  return data;
}
