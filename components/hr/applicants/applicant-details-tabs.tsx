"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDate, getDateTime } from "@/utils/formatDate";
import { useApplicantDetails } from "@/hooks/hr/applicants/useApplicantDetails";
import { useState } from "react";

export default function ApplicantDetailsTab({
  application,
  setStatus,
}: {
  application: any;
  setStatus: any;
}) {
  const { applicantDetails, loading, error, saving, save } =
    useApplicantDetails(application.userid, application.id);

  const handleChange = async (value: string) => {
    await save({ status: value });
    setStatus(application.id, value);
  };

  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Application Details</TabsTrigger>
        <TabsTrigger value="information">Applicant Information</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="grid gap-3">
        <div className="grid grid-cols-[1fr_auto_1fr] border border-gray-300 rounded-xl">
          <div className="p-4">
            <p className="text-sm text-gray-500">Application ID</p>
            <p>{application.id}</p>
          </div>
          <Separator orientation="vertical" />
          <div className="p-4">
            <p className="text-sm text-gray-500">Job ID</p>
            <p>{application.job_id}</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] border border-gray-300 rounded-xl">
          <div className="p-4">
            <p className="text-sm text-gray-500">Job Title</p>
            <p>{application.title}</p>
          </div>
          <Separator orientation="vertical" />
          <div className="p-4">
            <p className="text-sm text-gray-500">Status</p>
            <Select
              defaultValue={application.status}
              onValueChange={handleChange}
              disabled={saving}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="For interview">For interview</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {/* <ApplicantSelectStatus defaultValue={application.status} /> */}
          </div>
          <Separator orientation="vertical" />
          <div className="p-4">
            <p className="text-sm text-gray-500">Date Submitted</p>
            <p>{getDateTime(application.applied_at)}</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr] border border-gray-300 rounded-xl">
          <div className="p-4">
            <p className="text-sm text-gray-500">Notes</p>
            <p>{application.notes}</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="information" className="grid gap-3">
        {loading ? (
          <div className="text-muted-foreground">Loading…</div>
        ) : error ? (
          <div className="text-destructive">Error: {error}</div>
        ) : applicantDetails ? (
          <>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] border border-gray-300 rounded-xl">
              <div className="p-4">
                <p className="text-sm text-gray-500">First Name</p>
                <p>{application.first_name}</p>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4">
                <p className="text-sm text-gray-500">Middle Name</p>
                <p>{applicantDetails?.personal?.middle_name}</p>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4">
                <p className="text-sm text-gray-500">Last Name</p>
                <p>{application.last_name}</p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] border border-gray-300 rounded-xl">
              <div className="p-4">
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p>{getDate(applicantDetails?.personal?.birth_date)}</p>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4">
                <p className="text-sm text-gray-500">Civil Status</p>
                <p>{applicantDetails?.personal?.civil_status}</p>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4">
                <p className="text-sm text-gray-500">Nationality</p>
                <p>{applicantDetails?.personal?.citizenship}</p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] border border-gray-300 rounded-xl">
              <div className="p-4">
                <p className="text-sm text-gray-500">Contact Number</p>
                <p>{applicantDetails?.personal?.phone_number}</p>
              </div>
              <Separator orientation="vertical" />
              <div className="p-4">
                <p className="text-sm text-gray-500">Email Address</p>
                <p>{application.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr] border border-gray-300 rounded-xl">
              <div className="p-4">
                <p className="text-sm text-gray-500">Physical Address</p>
                <p>{applicantDetails?.personal?.physical_address}</p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr] border border-gray-300 rounded-xl">
              <div className="p-4">
                <p className="text-sm text-gray-500">Resume</p>
                <p>{application.resume_url}</p>
              </div>
            </div>
          </>
        ) : null}
      </TabsContent>
    </Tabs>
  );
}
