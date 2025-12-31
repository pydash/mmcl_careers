export async function fetchDashboardInterviews() {
  const res = await fetch("/api/applicant/dashboard/interviews", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch interviews");
  }
  return res.json();
}
