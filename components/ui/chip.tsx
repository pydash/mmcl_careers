import * as React from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  className?: string;
}

export function Chip({
  label,
  selected = false,
  onSelect,
  onDeselect,
  className,
}: ChipProps) {
  const handleClick = () => {
    if (selected) {
      onDeselect?.();
    } else {
      onSelect?.();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "px-4 py-1 rounded-full text-sm border transition-all",
        selected
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-muted text-muted-foreground border-muted-foreground/30",
        "hover:opacity-90",
        className
      )}
    >
      {label}
    </button>
  );
}
