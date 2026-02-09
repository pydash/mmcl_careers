export async function fetchProfileGetter() {
  const response = await fetch(`/api/applicant/profile`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch profile getter: ${response.status} ${body}`,
    );
  }

  const data = await response.json();
  return data;
}
