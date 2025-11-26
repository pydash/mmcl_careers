"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Funnel } from "lucide-react";
import { Separator } from "../../ui/separator";

import { useState } from "react";
import { Chip } from "@/components/ui/chip";
import { Label } from "../../ui/label";

export default function JobsFilter() {
  const filterList = {
    category: ["Teaching", "Non-Teaching"],
    type: ["Full-time", "Part-time", "Contract"],
    location: ["Remote", "On-site", "Hybrid"],
    department: [
      "SHS",
      "CAS",
      "CCIS",
      "ETYCB",
      "CN",
      "CHS",
      "MITL",
      "MIA",
      "CMET",
      "DIGITAL",
      "GRAD",
    ],
  };

  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          Filter <Funnel className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <Separator className="my-4" />
          <div className="filter-items flex flex-col gap-6">
            <div className="category-filter">
              <Label className="mb-4">Category</Label>
              <div className="flex gap-2 flex-wrap">
                {filterList.category.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selected.includes(label)}
                    onSelect={() => toggleChip(label)}
                    onDeselect={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
            <div className="type-filter">
              <Label className="mb-4">Type</Label>
              <div className="flex gap-2 flex-wrap">
                {filterList.type.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selected.includes(label)}
                    onSelect={() => toggleChip(label)}
                    onDeselect={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
            <div className="location-filter">
              <Label className="mb-4">Location</Label>
              <div className="flex gap-2 flex-wrap">
                {filterList.location.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selected.includes(label)}
                    onSelect={() => toggleChip(label)}
                    onDeselect={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
            <div className="department-filter">
              <Label className="mb-4">Departments</Label>
              <div className="flex gap-2 flex-wrap">
                {filterList.department.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selected.includes(label)}
                    onSelect={() => toggleChip(label)}
                    onDeselect={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="filter-buttons">
            <Button variant="outline" onClick={() => setSelected([])}>
              Clear Filters
            </Button>
            <Button className="ml-2">Apply Filters</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
