export async function fetchAllOffers() {
  try {
    const res = await fetch("/api/hr/applicants/offers"); 
    if (!res.ok) {
      const msg = await res.text().catch(() => "Failed to fetch offers");
      throw new Error(msg);
    }
    return res.json(); 
  } catch (err) {
    console.error("Error fetching offers", err);
    throw err;
  }
}
