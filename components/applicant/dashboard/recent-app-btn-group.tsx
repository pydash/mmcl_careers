"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RecentApplicationsButtonGroupProps {
  applicationId: string;
}

export default function RecentApplicationsButtonGroup({
  applicationId,
}: RecentApplicationsButtonGroupProps) {
  return (
    <Link href={`/applicant/applications/${applicationId}`} className="w-full sm:w-auto">
      <Button 
        variant="default" 
        size="sm" 
        className="w-full sm:w-auto bg-blue-950 hover:bg-blue-800 transition-colors font-semibold"
      >
        View Application
      </Button>
    </Link>
  );
}