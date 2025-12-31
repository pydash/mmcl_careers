export async function fetchNotifications() {
  const res = await fetch("/api/notification", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }
  return res.json();
}
