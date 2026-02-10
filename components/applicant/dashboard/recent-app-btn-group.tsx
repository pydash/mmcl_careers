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
    <Link href={`/applicant/applications/${applicationId}`}>
      <Button variant="default" size="sm" className="bg-blue-950 hover:bg-blue-800">
        View Application
      </Button>
    </Link>
  );
}
