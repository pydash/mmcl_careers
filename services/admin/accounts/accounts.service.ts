export async function fetchAdminAccounts() {
  const res = await fetch(`/api/admin/accounts`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch admin accounts");
  }

  return res.json();
}
