"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SearchBar from "@/components/search-bar";
import FilterButton from "@/components/filter-button";
import ViewButton from "@/components/view-button";
import { applicationsData, applicationsMenu } from "../sample-data";
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
import { Grid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [view, setView] = useState<"grid" | "row">("grid");
  return (
    <>
      <main className="p-4">
        <div className="flex flex-row gap-4 mb-4">
          <SearchBar />
          <FilterButton data={applicationsMenu} />
          <ViewButton view={view} setView={setView} />
        </div>
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {applicationsData.map((application) => (
              <GridCard key={application.title} variant="outline">
                <GridCardMedia
                  src={application.imgPath}
                  alt={application.title}
                />
                <GridCardHeader>
                  <div className="flex flex-row gap-2 mb-2">
                    {application.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <GridCardTitle>{application.title}</GridCardTitle>
                </GridCardHeader>
                <GridCardContent>
                  <GridCardDescription>
                    Date Applied: {application.dateApplied}
                  </GridCardDescription>
                </GridCardContent>
                <div className="px-4">
                  <Separator className="my-2" />
                </div>
                <GridCardFooter className="flex justify-between">
                  <GridCardDescription>
                    Status: {application.status}
                  </GridCardDescription>
                  <GridCardAction>View Details</GridCardAction>
                </GridCardFooter>
              </GridCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applicationsData.map((application) => (
              <RowCard key={application.title} variant="outline">
                <RowCardHeader>
                  <RowCardDescription>
                    Application ID: {application.applicationId}
                  </RowCardDescription>
                  <RowCardDescription>
                    Status: {application.status}
                  </RowCardDescription>
                </RowCardHeader>
                <div className="px-4">
                  <Separator className="my-2" />
                </div>
                <RowCardContent className="flex justify-between">
                  <div className="flex flex-col">
                    <RowCardTitle>{application.title}</RowCardTitle>
                    <RowCardDescription>
                      {application.description}
                    </RowCardDescription>
                  </div>
                  <div className="flex gap-4 items-center">
                    <RowCardDescription>
                      Date Applied: {application.dateApplied}
                    </RowCardDescription>
                    <RowCardAction>View Details</RowCardAction>
                  </div>
                </RowCardContent>
              </RowCard>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
