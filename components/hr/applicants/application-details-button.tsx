"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

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

  const generateApplicantPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;

    // Add logo
    const logoPath = "/logo_horizontal.png";
    doc.addImage(logoPath, "PNG", margin, yPosition, 50, 15);
    yPosition += 25;

    // Helper function to add text
    const addText = (text: string, x: number, y: number, options?: any) => {
      doc.text(text, x, y, options);
    };

    const addSection = (title: string) => {
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      addText(title, margin, yPosition);
      yPosition += 6;
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;
      doc.setFont(undefined, "normal");
      doc.setFontSize(10);
    };

    // Title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    addText("Application Details", margin, yPosition);
    yPosition += 10;

    // Applicant Information Section
    addSection("Applicant Information");
    addText(
      `Name: ${application.first_name} ${application.last_name}`,
      margin,
      yPosition,
    );
    yPosition += 6;
    addText(`Email: ${application.email_address}`, margin, yPosition);
    yPosition += 10;

    // Application Details Section
    addSection("Application Details");
    addText(`Application ID: ${application.id}`, margin, yPosition);
    yPosition += 6;
    addText(`Job Title: ${application.title || "N/A"}`, margin, yPosition);
    yPosition += 6;
    addText(`Status: ${application.status}`, margin, yPosition);
    yPosition += 6;

    const appliedDate = new Date(application.applied_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
    addText(`Applied Date: ${appliedDate}`, margin, yPosition);
    yPosition += 10;

    // Notes Section (if available)
    if (application.notes) {
      addSection("Notes");
      const noteLines = doc.splitTextToSize(
        application.notes,
        pageWidth - 2 * margin,
      );
      doc.text(noteLines, margin, yPosition);
      yPosition += noteLines.length * 5 + 5;
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont(undefined, "italic");
    doc.text(
      `Generated on ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
      margin,
      pageHeight - 10,
    );

    // Download the PDF
    doc.save(
      `${application.first_name}_${application.last_name}_application.pdf`,
    );
  };

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
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium">
              {application.last_name} {application.first_name}
            </p>
            <p>{application.email_address}</p>
          </div>
          <div>
            <Button onClick={generateApplicantPDF}>Download</Button>
          </div>
        </div>
        <ApplicantDetailsTab application={application} setStatus={setStatus} />
      </DialogContent>
    </Dialog>
  );
}
