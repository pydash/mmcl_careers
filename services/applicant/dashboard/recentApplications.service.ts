export async function fetchDashboardRecentApplications() {
  const res = await fetch("/api/applicant/dashboard/recent-applications", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recent applications");
  }
  return res.json();
}
