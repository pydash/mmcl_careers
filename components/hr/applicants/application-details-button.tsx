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

export function ApplicationDetailsButton({
  appId,
}: {
  appId: number | string;
}) {
  // const { jobDetails, loading, error, saving, save } = useJobDetails(jobId);
  const [open, setOpen] = useState(false);
  // const [form, setForm] = useState({
  //   title: "",
  //   description: "",
  //   is_active: true,
  // });

  // useEffect(() => {
  //   if (jobDetails) {
  //     setForm({
  //       title: jobDetails.title ?? "",
  //       description: jobDetails.description ?? "",
  //       is_active: jobDetails.is_active,
  //     });
  //   }
  // }, [jobDetails, open]);

  // const onSave = async () => {
  //   await save(form);
  //   setOpen(false);
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        {/* <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>
            Edit the job and save your changes.
          </DialogDescription>
        </DialogHeader> */}
        app {appId}
      </DialogContent>
    </Dialog>
  );
}
