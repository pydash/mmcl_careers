export async function fetchAllApplications() {
  const response = await fetch("/api/hr/applicants/applications", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.details || "Failed to fetch applications");
  }
  const data = await response.json();
  return data;
}
