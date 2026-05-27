import PublicFooter from "@/components/public-footer";
import PublicNavbar from "@/components/public-navbar";
import Link from "next/link";

const jobs = [
  {
    id: "a1b2c3",
    title: "Frontend Developer",
    department: "CCIS",
    employmentType: "Full Time",
    applyUntil: "Aug 30",
  },
  {
    id: "d4e5f6",
    title: "UI/UX Designer",
    department: "CAS",
    employmentType: "Part Time",
    applyUntil: "Sept 12",
  },
  {
    id: "g7h8i9",
    title: "Marketing Specialist",
    department: "ETYCB",
    employmentType: "Full Time",
    applyUntil: "Oct 05",
  },
  {
    id: "j1k2l3",
    title: "Backend Developer",
    department: "CCIS",
    employmentType: "Full Time",
    applyUntil: "Oct 15",
  },
  {
    id: "m4n5o6",
    title: "HR Assistant",
    department: "SHS",
    employmentType: "Part Time",
    applyUntil: "Nov 01",
  },
  {
    id: "p7q8r9",
    title: "Project Manager",
    department: "MITL",
    employmentType: "Full Time",
    applyUntil: "Nov 20",
  },
  {
    id: "s1t2u3",
    title: "Data Analyst",
    department: "CCIS",
    employmentType: "Full Time",
    applyUntil: "Dec 05",
  },
  {
    id: "v4w5x6",
    title: "Admissions Officer",
    department: "OSA",
    employmentType: "Part Time",
    applyUntil: "Dec 18",
  },
  {
    id: "y7z8a9",
    title: "Graphic Designer",
    department: "ETYCB",
    employmentType: "Full Time",
    applyUntil: "Jan 10",
  },
];

export default function PublicJobsPage() {
  return (
    <>
      <PublicNavbar />

      <main className="bg-gray-50 min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-900">Join Our Team</h1>

            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore exciting career opportunities and become part of a team
              that values innovation, collaboration, and growth.
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <Link
                href={`/jobs/${job.id}`}
                key={index}
                className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-xs font-medium px-3 py-1 ${
                      job.employmentType === "Full Time"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {job.employmentType}
                  </span>

                  <span className="text-xs text-gray-500">
                    Apply until: {job.applyUntil}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  {job.title}
                </h2>

                <p className="text-sm mt-2 text-gray-600">{job.department}</p>

                <button className="text-xs mt-6 w-full bg-blue-950 hover:bg-blue-900 text-white font-medium py-3 transition">
                  View Details
                </button>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
