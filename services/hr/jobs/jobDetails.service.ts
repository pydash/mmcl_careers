export async function fetchJobDetails(id: string) {
  const res = await fetch(`/api/hr/jobs/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch job details");
  return res.json();
}

export async function updateJobDetails(id: string, payload: any) {
  const res = await fetch(`/api/hr/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => null);
    throw new Error(msg || "Failed to update job");
  }
  return res.json();
}
