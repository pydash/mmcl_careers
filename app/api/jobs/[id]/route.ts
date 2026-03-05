import { NextRequest, NextResponse } from "next/server";
import { Job } from "@/models/job";

// Mock data - same as in route.ts (in a real app, this would be from a database)
const mockJobs: Job[] = [
  {
    id: 1,
    role: "Software Engineer",
    department: "Information Technology",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Feb 28, 2026",
    description:
      "We are looking for a talented software engineer to join our IT team.",
    requirements: [
      "Bachelor's degree in CS",
      "5+ years experience",
      "React/Node.js",
    ],
    salary_range: "₱60,000 - ₱80,000",
  },
  {
    id: 2,
    role: "Administrative Assistant",
    department: "Office of the Registrar",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Mar 1, 2026",
    description: "Support the registrar's office with administrative tasks.",
    requirements: [
      "High school diploma",
      "2+ years experience",
      "MS Office proficiency",
    ],
    salary_range: "₱25,000 - ₱35,000",
  },
  {
    id: 3,
    role: "Research Assistant",
    department: "College of Science",
    type: "Part-time",
    teaching_type: "Non-teaching",
    posted: "Mar 2, 2026",
    description: "Assist faculty with research projects.",
    requirements: ["Bachelor's degree", "Research experience", "Data analysis"],
    salary_range: "₱15,000 - ₱20,000/month",
  },
  {
    id: 4,
    role: "Faculty – Business Management",
    department: "College of Business",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Mar 3, 2026",
    description: "Teach business management courses to undergraduate students.",
    requirements: [
      "Master's degree",
      "5+ years in industry",
      "Teaching experience",
    ],
    salary_range: "₱70,000 - ₱100,000",
  },
  {
    id: 5,
    role: "Guidance Counselor",
    department: "Student Affairs",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Mar 4, 2026",
    description: "Provide counseling services to students.",
    requirements: [
      "Master's degree in Counseling",
      "Valid license",
      "2+ years experience",
    ],
    salary_range: "₱45,000 - ₱60,000",
  },
  {
    id: 6,
    role: "Library Assistant",
    department: "University Library",
    type: "Part-time",
    teaching_type: "Non-teaching",
    posted: "Mar 5, 2026",
    description: "Assist with library operations and student services.",
    requirements: [
      "High school diploma",
      "Customer service skills",
      "Computer literacy",
    ],
    salary_range: "₱12,000 - ₱16,000/month",
  },
];

// GET /api/jobs/[id] - Fetch a single job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id, 10);

    const job = mockJobs.find((j) => j.id === id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// PUT /api/jobs/[id] - Update a job
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const jobIndex = mockJobs.findIndex((j) => j.id === id);

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...body, id };

    return NextResponse.json(mockJobs[jobIndex]);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}

// DELETE /api/jobs/[id] - Delete a job
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id, 10);

    const jobIndex = mockJobs.findIndex((j) => j.id === id);

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    mockJobs.splice(jobIndex, 1);

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 },
    );
  }
}
