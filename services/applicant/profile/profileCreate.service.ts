export async function fetchProfileCreate(payload: any) {
  const response = await fetch(`/api/applicant/profile/create-profile`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch profile create: ${response.status} ${body}`,
    );
  }

  const data = await response.json();
  return data;
}
