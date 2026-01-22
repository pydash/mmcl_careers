import { Input } from "@/components/ui/input";
import { useJobSearch, type JobSearchResult } from "@/hooks/hr/jobs/useJobSearch";

type SearchBarProps = {
  onSearchResults?: (results: JobSearchResult[]) => void;
  onQueryChange?: (query: string) => void;
};

export default function SearchBar({ onSearchResults, onQueryChange }: SearchBarProps) {
  const { query, setQuery, results, isSearching } = useJobSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onQueryChange?.(newQuery);
  };

  // Notify parent of search results when they change
  if (onSearchResults) {
    onSearchResults(results);
  }

  return (
    <div className="relative">
      <Input
        placeholder="Search jobs..."
        value={query}
        onChange={handleChange}
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
