export async function fetchAllApplications() {
  const response = await fetch("/api/hr/applicants/applications", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }
  const data = await response.json();
  return data;
}
