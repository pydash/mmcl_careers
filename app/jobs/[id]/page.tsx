import Link from "next/link";
import PublicFooter from "@/components/public-footer";
import PublicNavbar from "@/components/public-navbar";

import { ChevronLeft } from "lucide-react";

export default function PublicJobPage() {
  return (
    <>
      <PublicNavbar />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Top Section */}
          <Link
            href={"/jobs"}
            className="inline-flex items-center gap-1 mb-4 hover:underline"
          >
            <ChevronLeft />
            Back
          </Link>
          <div className="bg-white border border-gray-200 p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  CCIS Department
                </p>

                <h1 className="mt-3 text-5xl font-bold text-gray-900">
                  Frontend Developer
                </h1>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
                    Full Time
                  </span>

                  <span className="bg-gray-100 text-gray-700 px-4 py-2 text-sm font-medium">
                    Apply until Aug 30
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto">
                <button className="w-full lg:w-auto bg-[#001C43] hover:bg-[#00285f] text-white font-medium px-10 py-4 transition">
                  Apply for this Job
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <section className="bg-white border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                  Job Description
                </h2>

                <p className="text-gray-700 leading-8">
                  We are looking for a skilled Frontend Developer who is
                  passionate about building modern, responsive, and user-focused
                  web applications. You will collaborate closely with designers,
                  backend developers, and project managers to deliver
                  high-quality digital experiences.
                </p>
              </section>

              {/* Responsibilities */}
              <section className="bg-white border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                  Responsibilities
                </h2>

                <ul className="space-y-4 text-gray-700">
                  <li>• Develop responsive web interfaces using React.</li>
                  <li>• Collaborate with UI/UX designers.</li>
                  <li>• Maintain clean and scalable codebases.</li>
                  <li>• Optimize applications for speed and accessibility.</li>
                  <li>• Participate in code reviews and team discussions.</li>
                </ul>
              </section>

              {/* Qualifications */}
              <section className="bg-white border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                  Qualifications
                </h2>

                <ul className="space-y-4 text-gray-700">
                  <li>
                    • Bachelor’s degree in Computer Science or related field.
                  </li>
                  <li>• Strong knowledge of React and TypeScript.</li>
                  <li>• Experience with Tailwind CSS.</li>
                  <li>• Familiarity with REST APIs.</li>
                  <li>• Good communication and teamwork skills.</li>
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Job Information */}
              <section className="bg-white border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Job Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="mt-1 font-medium text-gray-900">CCIS</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Employment Type</p>
                    <p className="mt-1 font-medium text-gray-900">Full Time</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Apply Until</p>
                    <p className="mt-1 font-medium text-gray-900">
                      August 30, 2026
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="mt-1 font-medium text-gray-900">
                      On-site / Laguna Campus
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-white border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  Need Help?
                </h2>

                <p className="text-gray-700 leading-7">
                  For questions regarding this position, please contact the HR
                  department or recruitment office.
                </p>

                <button className="mt-6 w-full border border-[#001C43] text-[#001C43] hover:bg-[#001C43] hover:text-white py-3 font-medium transition">
                  Contact HR
                </button>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
