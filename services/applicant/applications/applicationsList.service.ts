export async function fetchApplications() {
  const res = await fetch("/api/applicant/applications", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}
