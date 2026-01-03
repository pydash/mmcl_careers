export async function fetchJobPostItemList() {
  const response = await fetch("/api/applicant/jobs", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const data = await response.json();
  return data;
}
