import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const jobs = [
  {
    id: 1,
    role: "Software Engineer",
    department: "Information Technology",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Feb 28, 2026",
  },
  {
    id: 2,
    role: "Administrative Assistant",
    department: "Office of the Registrar",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Mar 1, 2026",
  },
  {
    id: 3,
    role: "Research Assistant",
    department: "College of Science",
    type: "Part-time",
    teaching_type: "Non-teaching",
    posted: "Mar 2, 2026",
  },
  {
    id: 4,
    role: "Faculty – Business Management",
    department: "College of Business",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Mar 3, 2026",
  },
  {
    id: 5,
    role: "Guidance Counselor",
    department: "Student Affairs",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Mar 4, 2026",
  },
  {
    id: 6,
    role: "Library Assistant",
    department: "University Library",
    type: "Part-time",
    teaching_type: "Teaching",
    posted: "Mar 5, 2026",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero */}
      <section className="bg-red-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
            Mapúa Malayan Colleges Laguna
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-6">
            A Fulfilling Career.
            <br />
            Right Here.
          </h1>
          <p className="text-white/50 max-w-xl text-lg leading-relaxed mb-8">
            Explore career and faculty opportunities across all university
            departments. We're looking for passionate individuals to help shape
            the future of education.
          </p>
          <Button asChild variant="secondary" size="lg">
            <a href="/jobs">Browse Open Positions</a>
          </Button>
        </div>
      </section>

      {/* Jobs Grid */}
      <section id="jobs" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Open Positions
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Current job openings across all university departments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="flex flex-col hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {job.type}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {job.teaching_type}
                    </span>
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {job.role}
                  </CardTitle>
                  <p className="text-red-700 text-sm">{job.department}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 flex-1">
                  <p className="text-xs text-gray-400 mt-auto">
                    Posted {job.posted}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="link"
                    className="text-red-700 p-0 h-auto"
                  >
                    <a href="#">View Details →</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Why Join MMCL?
          </h2>
          <p className="text-gray-500 text-sm mb-12">
            We foster a culture of excellence, integrity, and community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Inclusive Community",
                desc: "A diverse and welcoming environment for staff, faculty, and students.",
              },
              {
                title: "Growth Opportunities",
                desc: "Professional development programs and continuing education support.",
              },
              {
                title: "Competitive Benefits",
                desc: "Comprehensive health, retirement, and leave benefit packages.",
              },
              {
                title: "Purposeful Work",
                desc: "Contribute to the education and lives of future generations.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="w-8 h-1 bg-red-500 rounded mb-2" />
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
