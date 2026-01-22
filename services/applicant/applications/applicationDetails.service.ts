export async function fetchApplicationDetails(id: string) {
  const res = await fetch(`/api/applicant/applications/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch application details");
  }
  return res.json();
}
