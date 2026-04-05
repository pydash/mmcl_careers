"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Detect specific route patterns
  const isJobDetails =
    segments.includes("applicant") &&
    segments.includes("jobs") &&
    segments.length === 3;

  const isJobApply =
    segments.includes("applicant") &&
    segments.includes("jobs") &&
    segments.includes("apply") &&
    segments.length === 4;

  if (isJobApply) {
    const jobId = segments[2];
    return (
      <div className="px-4 py-3 md:px-0 mt-12 lg:mt-0">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link 
                  href="/applicant/jobs" 
                  className="text-xs md:text-sm font-medium hover:text-red-600 transition-colors"
                >
                  Browse Jobs
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-300" />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link 
                  href={`/applicant/jobs/${jobId}`}
                  className="text-xs md:text-sm font-medium hover:text-red-600 transition-colors"
                >
                  Job Details
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-300" />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs md:text-sm font-bold text-slate-900">
                Application Form
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }

  if (isJobDetails) {
    return (
      <div className="px-4 py-3 md:px-0 mt-12 lg:mt-0">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link 
                  href="/applicant/jobs"
                  className="text-xs md:text-sm font-medium hover:text-red-600 transition-colors"
                >
                  Browse Jobs
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-300" />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs md:text-sm font-bold text-slate-900">
                Job Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }

  // fallback (other routes)
  return null;
}