export async function fetchDashboardResume() {
  const res = await fetch("/api/applicant/dashboard/resume", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch resume");
  }
  return res.json();
}
