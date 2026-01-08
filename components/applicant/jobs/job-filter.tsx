"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";

interface JobFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  salaryRange: { min: number; max: number };
  onSalaryRangeChange: (range: { min: number; max: number }) => void;
}

export default function JobFilter({
  availableTags,
  selectedTags,
  onTagsChange,
  salaryRange,
  onSalaryRangeChange,
}: JobFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onTagsChange([]);
    onSalaryRangeChange({ min: 0, max: 1000000 });
  };

  const salaryRanges = [
    { label: "All", min: 0, max: 1000000 },
    { label: "Under ₱20,000", min: 0, max: 20000 },
    { label: "₱20,000 - ₱40,000", min: 20000, max: 40000 },
    { label: "₱40,000 - ₱60,000", min: 40000, max: 60000 },
    { label: "₱60,000 - ₱80,000", min: 60000, max: 80000 },
    { label: "Above ₱80,000", min: 80000, max: 1000000 },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
          {selectedTags.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedTags.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Jobs</SheetTitle>
          <SheetDescription>
            Refine your job search by category and salary range.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Tags Filter */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Job Categories</h3>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTagsChange([])}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Salary Range Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Salary Range</h3>
            <div className="space-y-2">
              {salaryRanges.map((range) => (
                <div
                  key={range.label}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    salaryRange.min === range.min &&
                    salaryRange.max === range.max
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent"
                  }`}
                  onClick={() => onSalaryRangeChange(range)}
                >
                  <p className="text-sm font-medium">{range.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Clear All Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
            disabled={selectedTags.length === 0 && salaryRange.max === 1000000}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
