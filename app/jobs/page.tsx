"use client";

import { useState } from "react";
import {
  GridCard,
  GridCardHeader,
  GridCardTitle,
  GridCardDescription,
  GridCardContent,
  GridCardFooter,
  GridCardMedia,
  GridCardAction,
} from "@/components/grid-card";

import {
  RowCard,
  RowCardHeader,
  RowCardTitle,
  RowCardDescription,
  RowCardContent,
  RowCardAction,
} from "@/components/row-card";

import SearchBar from "@/components/search-bar";
import FilterButton from "@/components/filter-button";
import ViewButton from "@/components/view-button";
import JobsSort from "@/components/pages/browse-jobs/jobs-sort";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { BookmarkIcon } from "lucide-react";

import { jobsData, menu } from "../sample-data";

export default function Page() {
  const [view, setView] = useState<"grid" | "row">("grid");

  return (
    <div className="p-6">
      <div className="flex flex-row gap-4 mb-6">
        <SearchBar />
        <FilterButton data={menu} />
        <ViewButton view={view} setView={setView} />
        <JobsSort />
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {jobsData.map((job) => (
            <GridCard key={job.title} variant="outline">
              <GridCardMedia src={job.imgPath} alt={job.title} />

              <GridCardHeader>
                <div className="flex flex-row gap-2 mb-2">
                  {job.badges.map((badge, i) => (
                    <Badge key={i} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <GridCardTitle>{job.title}</GridCardTitle>
                  <GridCardDescription>{job.description}</GridCardDescription>
                </div>
              </GridCardHeader>

              <GridCardContent></GridCardContent>

              <div className="px-4">
                <Separator className="my-2" />
              </div>

              <GridCardFooter className="flex gap-2 justify-between">
                <GridCardDescription>{job.salaryRange}</GridCardDescription>
                <div className="flex gap-2">
                  <GridCardAction variant="default">
                    View Details
                  </GridCardAction>
                  <Toggle
                    aria-label="Toggle save"
                    variant="outline"
                    className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-amber-500 data-[state=on]:*:[svg]:stroke-amber-500"
                  >
                    <BookmarkIcon />
                    Save
                  </Toggle>
                </div>
              </GridCardFooter>
            </GridCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobsData.map((job) => (
            <RowCard key={job.title} variant="outline">
              <RowCardHeader>
                <div className="flex flex-row gap-2">
                  {job.badges.map((badge, i) => (
                    <Badge key={i} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </RowCardHeader>

              <RowCardContent>
                <RowCardTitle>{job.title}</RowCardTitle>
                <RowCardDescription>{job.description}</RowCardDescription>
              </RowCardContent>

              <Separator className="my-2" />

              <div className="flex items-center justify-between px-4 pb-4">
                <RowCardDescription>{job.salaryRange}</RowCardDescription>

                <div className="flex gap-2">
                  <RowCardAction>View Details</RowCardAction>

                  <Toggle
                    aria-label="Toggle save"
                    variant="outline"
                    className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-amber-500 data-[state=on]:*:[svg]:stroke-amber-500"
                  >
                    <BookmarkIcon />
                    Save
                  </Toggle>
                </div>
              </div>
            </RowCard>
          ))}
        </div>
      )}
    </div>
  );
}
