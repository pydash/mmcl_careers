import { useState, useEffect } from "react";

export type JobSearchResult = {
  id: string;
  title: string;
  department: string;
  job_type: string;
  is_active: boolean;
  created_at: string;
};

export function useJobSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<JobSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setIsSearching(true);
        setError(null);

        const response = await fetch(
          `/api/hr/jobs/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to search jobs");
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
  };
}
