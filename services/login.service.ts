export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to log in");
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during login");
  }
}
