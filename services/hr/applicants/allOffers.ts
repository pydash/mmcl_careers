export async function fetchAllOffers() {
  const response = await fetch("/api/hr/applicants/offers", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }
  const data = await response.json();
  return data;
}
