import { NextRequest, NextResponse } from "next/server";
import { Job } from "@/models/job";

// Mock data - replace with database calls
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

// GET /api/jobs - Fetch all jobs or filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const teaching_type = searchParams.get("teaching_type");
    const department = searchParams.get("department");

    let filteredJobs = mockJobs;

    if (type) {
      filteredJobs = filteredJobs.filter((job) => job.type === type);
    }
    if (teaching_type) {
      filteredJobs = filteredJobs.filter(
        (job) => job.teaching_type === teaching_type,
      );
    }
    if (department) {
      filteredJobs = filteredJobs.filter(
        (job) => job.department === department,
      );
    }

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { role, department, type, teaching_type, posted } = body;
    if (!role || !department || !type || !teaching_type || !posted) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create new job with mock ID
    const newJob: Job = {
      id: mockJobs.length + 1,
      ...body,
    };

    mockJobs.push(newJob);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}
