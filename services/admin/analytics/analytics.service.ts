export async function fetchAnalytics() {
  const res = await fetch(`/api/admin/analytics`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}
