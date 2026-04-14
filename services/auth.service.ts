export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const payload = await res.json();
  if (!res.ok) {
    throw new Error(payload?.error || "Login failed");
  }

  return payload;
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
  return res.json();
}
