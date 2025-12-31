export async function fetchDashboardOverview() {
  const res = await fetch("/api/applicant/dashboard/overview", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard overview");
  }
  return res.json();
}
