export async function fetchJobDetails(pub_id: string) {
  const response = await fetch(`/api/applicant/jobs/${pub_id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }

  const data = await response.json();
  return data;
}
