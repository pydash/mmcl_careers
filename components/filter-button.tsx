"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Funnel } from "lucide-react";
import { Separator } from "./ui/separator";

import { useState } from "react";
import { Chip } from "@/components/ui/chip";
import { Label } from "./ui/label";

type FilterButtonProps = {
  title: string;
  options: string[];
}[];

export default function JobsFilter({ data }: { data: FilterButtonProps }) {
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
            {data.map((filterList) => (
              <div
                key={filterList.title}
                className={`${filterList.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}-filter`}
              >
                <Label className="mb-4">{filterList.title}</Label>
                <div className="flex gap-2 flex-wrap">
                  {filterList.options.map((label) => (
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
            ))}
            <Separator className="my-4" />
            <div className="filter-buttons">
              <Button variant="outline" onClick={() => setSelected([])}>
                Clear Filters
              </Button>
              <Button className="ml-2">Apply Filters</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
