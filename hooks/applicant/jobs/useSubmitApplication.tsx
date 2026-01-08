import { useState } from "react";

import { pushSubmitApplication } from "@/services/applicant/jobs/submitApplication.service";

export default function useSubmitApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      await pushSubmitApplication(data.jobId, data.pitch);
    } catch (err) {
      setError("Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error };
}
