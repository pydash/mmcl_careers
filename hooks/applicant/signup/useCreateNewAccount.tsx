import { useState } from "react";
import { createNewAccount } from "@/services/applicant/signup/signup.service";

export function useCreateNewAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (email: string, password_hash: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createNewAccount({ email, password_hash });
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
      throw err;
    }
  };

  return { createAccount, loading, error };
}
