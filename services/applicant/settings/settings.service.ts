export async function fetchSettings() {
  const response = await fetch(`/api/applicant/settings`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
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
