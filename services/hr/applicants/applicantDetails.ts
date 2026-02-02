export async function fetchApplicantDetails(id: string) {
  const res = await fetch(`/api/hr/applicants/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch applicant details");
  return res.json();
}

export async function updateApplicationDetails(id: string, payload: any) {
  const res = await fetch(`/api/hr/applicants/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => null);
    throw new Error(msg || "Failed to update applicant details");
  }
  return res.json();
}
