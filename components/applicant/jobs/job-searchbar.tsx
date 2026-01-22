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
    <div className="w-100">
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full shadow-none rounded-none border focus:border-blue-500 focus:outline-none focus-visible:ring-0"
      />
    </div>
  );
}
