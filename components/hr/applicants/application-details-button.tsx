"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDateTime } from "@/utils/formatDate";
import ApplicantDetailsTab from "./applicant-details-tabs";
import { useRouter } from "next/navigation";

export function ApplicationDetailsButton({
  application,
  setStatus,
}: {
  application: any;
  setStatus: any;
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const refreshData = () => {
    router.refresh();
  };

  // console.log(application);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Application Information</DialogTitle>
          {/* <DialogDescription>
            Edit the job and save your changes.
          </DialogDescription> */}
        </DialogHeader>
        <div>
          <p className="text-lg font-medium">
            {application.last_name} {application.first_name}
          </p>
          <p>{application.email}</p>
        </div>
        <ApplicantDetailsTab application={application} setStatus={setStatus} />
      </DialogContent>
    </Dialog>
  );
}
