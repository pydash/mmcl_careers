export async function fetchDashboardJobs() {
  const res = await fetch("/api/applicant/dashboard/jobs", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
}
