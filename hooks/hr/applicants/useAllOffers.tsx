"use client";

import { useState, useEffect } from "react";
import { fetchAllOffers } from "@/services/hr/applicants/allOffers";

export function useAllOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllOffers()
      .then((data) => {
        setOffers(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { offers, loading, error };
}
