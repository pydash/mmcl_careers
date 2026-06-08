export async function getApplications() {
  const res = await fetch("/api/applicant/applications", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  return res.json();
}

export async function getApplication(id: string) {
  const res = await fetch(`/api/applicant/applications/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch application");
  }

  return res.json();
}

export async function cancelApplication(id: string) {
  const res = await fetch(`/api/applicant/applications/${id}/cancel`, {
    method: "PATCH",
  });

  return res;
}
