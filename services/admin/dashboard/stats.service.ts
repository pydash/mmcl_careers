export async function fetchStats() {
  const res = await fetch(`/api/admin/dashboard`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return res.json();
}
