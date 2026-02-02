export async function fetchAllInterviews() {
  const response = await fetch("/api/hr/applicants/interviews", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }
  const data = await response.json();
  return data;
}
