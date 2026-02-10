"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchAllInterviews } from "@/services/hr/applicants/allInterviews";

export function useAllInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAllInterviews();
      setInterviews(data);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  return { interviews, loading, error, refetch: fetchInterviews };
}

// "use client";

// import { useState, useEffect } from "react";
// import { fetchAllInterviews } from "@/services/hr/applicants/allInterviews";

// export function useAllInterviews() {
//   const [interviews, setInterviews] = useState([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     fetchAllInterviews()
//       .then((data) => {
//         setInterviews(data);
//         setLoading(false);
//       })
//       .catch((err: any) => {
//         setError(err?.message ?? "Unknown error");
//         setLoading(false);
//       });
//   }, []);

//   return { interviews, loading, error };
// }
