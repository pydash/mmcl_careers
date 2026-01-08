import { Input } from "@/components/ui/input";

interface JobSearchbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function JobSearchbar({
  searchQuery,
  onSearchChange,
}: JobSearchbarProps) {
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search jobs by title..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
