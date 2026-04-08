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

interface JobFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const COLLEGES_TAGS = ["CCIS", "CAS", "MITL", "MIA", "ETYCB", "SHS"];
const OFFICES_TAGS = ["HR", "ITSO", "Registrar", "Clinic"];
const TYPE_TAGS = ["Full time", "Part time"];
const TEACHING_TYPE_TAGS = ["Teaching", "Non Teaching"];
const availableTags = [
  ...COLLEGES_TAGS,
  ...OFFICES_TAGS,
  ...TYPE_TAGS,
  ...TEACHING_TYPE_TAGS,
];

export default function JobFilter({
  selectedTags,
  onTagsChange,
}: JobFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const collegeTags = ["CCIS", "CAS", "MITL", "MIA", "ETYCB", "SHS"].filter(
    (tag) => availableTags.includes(tag),
  );
  const officeTags = ["HR", "ITSO", "Registrar", "Clinic"].filter((tag) =>
    availableTags.includes(tag),
  );
  const typeTags = ["Full time", "Part time"].filter((tag) =>
    availableTags.includes(tag),
  );
  const teachingTypeTags = ["Teaching", "Non Teaching"].filter((tag) =>
    availableTags.includes(tag),
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onTagsChange([]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 shadow-none rounded-none font-light"
        >
          Filter
          {selectedTags.length > 0 && <p>({selectedTags.length})</p>}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Jobs</SheetTitle>
          <SheetDescription>
            Refine your job search by category.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Tags Filter */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">Colleges</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {collegeTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer rounded-none ${
                    selectedTags.includes(tag)
                      ? "bg-red-500 border-red-500 text-white hover:bg-red-500"
                      : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <h3 className="font-semibold text-sm">Offices</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {officeTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer rounded-none ${
                    selectedTags.includes(tag)
                      ? "bg-red-500 border-red-500 text-white hover:bg-red-500"
                      : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <h3 className="font-semibold text-sm">Employment Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {typeTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer rounded-none ${
                    selectedTags.includes(tag)
                      ? "bg-red-500 border-red-500 text-white hover:bg-red-500"
                      : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <h3 className="font-semibold text-sm">Teaching Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {teachingTypeTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer rounded-none ${
                    selectedTags.includes(tag)
                      ? "bg-red-500 border-red-500 text-white hover:bg-red-500"
                      : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Clear All Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
            disabled={selectedTags.length === 0}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
