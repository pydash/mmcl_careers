export async function fetchProfileGetter() {
  const response = await fetch(`/api/applicant/profile`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile getter");
  }

  const data = await response.json();
  return data;
}
