import { useState } from "react";

import { createApplication } from "@/services/applicant/jobs/submitApplication.service";

export default function useSubmitApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      await createApplication(data.job_pub_id, data.pitch);
    } catch (err) {
      setError("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error };
}
