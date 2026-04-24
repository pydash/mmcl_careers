import { getDate, getDateFromShortDate } from "@/lib/datetime.helpers";
import jsPDF from "jspdf";
import { toTitleCase } from "./text.helpers";

type ApplicationData = {
  application: {
    id: number;
    title: string;
    pitch: string;
    date_applied: string;
  };
  personal: {
    honorific: string;
    full_name: string;
    birthdate: string;
    sex: string;
    citizenship: string;
    civil_status: string;
    phone_number: string;
    physical_address: string;
    email_address: string;
    about: string;
  };
  education: {
    degree: string;
    institution: string;
    course: string;
    status: string;
    units_earned: number;
    year_finished: number;
    honors?: string[] | null;
  }[];
  employment: {
    position: string;
    specialization: string;
    company: string;
    industry: string;
    salary: number;
    date_started: string;
    date_ended: string;
    courses_handled: string[];
  }[];
  licenses: {
    title: string;
    organization: string;
    number: string;
    date_issued: string;
    expiry_date?: string | null;
  }[];
  govids: {
    type: string;
    number: string;
    authority?: string | null;
    date_issued: string;
    expiry_date: string;
  }[];
};

// -------------------------
// helper: load image as base64
// -------------------------
const loadImageAsDataURL = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();

  return await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export default async function downloadApplication({
  profile_id,
  job_id,
}: {
  profile_id: string;
  job_id: number;
}) {
  const res = await fetch(
    `/api/hr/applications/download/${profile_id}?job_id=${job_id}`,
  );

  const formData: ApplicationData = await res.json();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  const checkPageBreak = (space = 20) => {
    if (y + space > 270) {
      doc.addPage();
      y = 20;
    }
  };

  const drawField = (
    label: string,
    value: string,
    x: number,
    currentY: number,
    width: number,
  ) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(170);
    doc.text(label, x, currentY);

    doc.setDrawColor(220);
    doc.rect(x, currentY + 2, width, 10);

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(value || "", x + 2, currentY + 8);
  };

  const drawRecordHeader = (title: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(title, margin, y);
    y += 8;
  };

  // =========================
  // HEADER (LOGO + TIMESTAMP)
  // =========================

  const logoBase64 = await loadImageAsDataURL("/logo_horizontal.png");

  const logoWidth = 30; // mm
  const logoAspectRatio = 1829 / 6115;
  const logoHeight = logoWidth * logoAspectRatio;

  // fixed header baseline
  const headerY = y;

  // draw logo (left)
  doc.addImage(logoBase64, "PNG", margin, headerY, logoWidth, logoHeight);

  // timestamp (right, aligned to same Y baseline)
  doc.setFontSize(7);
  doc.setTextColor(100);
  doc.text(
    `Time Generated: ${new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
    })}`,
    pageWidth - margin,
    headerY + 5, // small tweak for vertical centering
    { align: "right" },
  );

  // move cursor BELOW the tallest header element
  y = headerY + Math.max(logoHeight, 6) + 5;

  // =========================
  // TITLE
  // =========================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("Application Form", pageWidth / 2, y, { align: "center" });

  y += 15;

  const col2 = margin + 95;

  // =========================
  // APPLICATION DETAILS
  // =========================
  doc.setFontSize(12);
  doc.text("Application Details", margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  y += 10;

  drawField("Applicant Name", formData.personal.full_name, margin, y, 85);
  drawField("Applying Position", formData.application.title, col2, y, 85);

  y += 20;

  drawField(
    "Date Applied",
    getDate(formData.application.date_applied),
    margin,
    y,
    85,
  );
  drawField("Application ID", String(formData.application.id), col2, y, 85);

  y += 25;

  doc.setFont("helvetica", "bold");
  doc.text("Pitch", margin, y);

  doc.setFont("helvetica", "normal");
  const pitchLines = doc.splitTextToSize(
    formData.application.pitch,
    pageWidth - margin * 2,
  );
  doc.text(pitchLines, margin, y + 5);

  y += pitchLines.length * 5 + 10;

  // =========================
  // PERSONAL INFO
  // =========================
  checkPageBreak();

  doc.setFont("helvetica", "bold");
  doc.text("Personal Information", margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  y += 10;

  drawField("Birthdate", getDate(formData.personal.birthdate), margin, y, 85);
  drawField("Sex", toTitleCase(formData.personal.sex), col2, y, 85);

  y += 20;

  drawField(
    "Civil Status",
    toTitleCase(formData.personal.civil_status),
    margin,
    y,
    85,
  );
  drawField("Citizenship", formData.personal.citizenship, col2, y, 85);

  y += 20;

  drawField("Phone", formData.personal.phone_number, margin, y, 85);
  drawField("Email", formData.personal.email_address, col2, y, 85);

  y += 25;

  doc.setFont("helvetica", "bold");
  doc.text("About", margin, y);

  doc.setFont("helvetica", "normal");
  const aboutLines = doc.splitTextToSize(
    formData.personal.about,
    pageWidth - margin * 2,
  );
  doc.text(aboutLines, margin, y + 5);

  // =========================
  // EDUCATION
  // =========================
  doc.addPage();
  y = 20;

  doc.setFont("helvetica", "bold");
  doc.text("Educational Background", margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  y += 10;

  formData.education.forEach((edu, i) => {
    checkPageBreak(50);

    drawRecordHeader(`Record ${i + 1}`);

    drawField("Degree", edu.degree, margin, y, 85);
    drawField("Institution", edu.institution, col2, y, 85);
    y += 20;

    drawField("Course", edu.course, margin, y, 85);
    drawField("Status", edu.status, col2, y, 85);
    y += 20;

    drawField("Units", String(edu.units_earned), margin, y, 85);
    drawField("Year", String(edu.year_finished), col2, y, 85);
    y += 25;
  });

  // =========================
  // EMPLOYMENT
  // =========================
  checkPageBreak();

  doc.setFont("helvetica", "bold");
  doc.text("Employment History", margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  y += 10;

  formData.employment.forEach((emp, i) => {
    checkPageBreak(70);

    drawRecordHeader(`Record ${i + 1}`);

    drawField("Position", emp.position, margin, y, 85);
    drawField("Company", emp.company, col2, y, 85);
    y += 20;

    drawField("Specialization", emp.specialization, margin, y, 85);
    drawField("Industry", emp.industry, col2, y, 85);
    y += 20;

    drawField("Salary", String(emp.salary), margin, y, 85);

    const period = `${getDate(emp.date_started)} - ${
      getDate(emp.date_ended) || "Present"
    }`;
    drawField("Employment Period", period, col2, y, 85);
    y += 25;

    doc.setFont("helvetica", "bold");
    doc.text("Courses Handled", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    const coursesLines = doc.splitTextToSize(
      emp.courses_handled?.length ? emp.courses_handled.join(", ") : "N/A",
      pageWidth - margin * 2,
    );

    doc.text(coursesLines, margin, y);
    y += coursesLines.length * 5 + 12;
  });

  // =========================
  // LICENSES
  // =========================
  doc.addPage();
  y = 20;

  doc.setFont("helvetica", "bold");
  doc.text("Licenses & Certifications", margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  y += 10;

  formData.licenses.forEach((lic, i) => {
    checkPageBreak(40);

    drawRecordHeader(`Record ${i + 1}`);

    drawField("Title", lic.title, margin, y, 85);
    drawField("Organization", lic.organization, col2, y, 85);
    y += 20;

    drawField("Number", lic.number, margin, y, 85);
    drawField("Issued", getDateFromShortDate(lic.date_issued), col2, y, 85);
    y += 20;

    drawField("Expiry", lic.expiry_date || "N/A", margin, y, 85);
    y += 25;
  });

  // =========================
  // GOV IDS
  // =========================
  checkPageBreak();

  doc.setFont("helvetica", "bold");
  doc.text("Government IDs", margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  y += 10;

  formData.govids.forEach((id, i) => {
    checkPageBreak(40);

    drawRecordHeader(`Record ${i + 1}`);

    drawField("Type", id.type, margin, y, 85);
    drawField("Number", id.number, col2, y, 85);
    y += 20;

    drawField("Authority", id.authority || "N/A", margin, y, 85);
    drawField("Issued", getDate(id.date_issued), col2, y, 85);
    y += 20;

    drawField("Expiry", getDate(id.expiry_date), margin, y, 85);
    y += 25;
  });

  doc.save(`Application_${formData.personal.full_name}.pdf`);
}
