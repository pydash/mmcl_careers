"use client";

import { Input } from "@/components/ui/input";

interface ApplicationsSearchbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ApplicationsSearchbar({
  value,
  onChange,
}: ApplicationsSearchbarProps) {
  return (
    <div className="w-100">
      <Input
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full shadow-none rounded-none border focus:border-blue-500 focus:outline-none focus-visible:ring-0"
      />
    </div>
  );
}
