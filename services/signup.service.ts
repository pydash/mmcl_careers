export async function signup(
  email: string,
  password: string,
  confirmPassword: string,
) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to sign up");
    }

    return await response.json();
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during signup");
  }
}
