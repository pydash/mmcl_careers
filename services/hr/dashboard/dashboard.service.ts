export async function fetchOverviewData() {
  const response = await fetch("/api/hr/dashboard", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || "Failed to fetch dashboard data");
  }
  const data = await response.json();
  return data;
}
