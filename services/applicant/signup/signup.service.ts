export async function createNewAccount(data: {
  email: string;
  password_hash: string;
}) {
  const response = await fetch("/api/applicant/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create new account");
  }

  return response.json();
}
