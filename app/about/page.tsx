import PublicNavbar from "@/components/public-navbar";
import PublicFooter from "@/components/public-footer";
import Link from "next/link";

export default function PublicAboutPage() {
  return (
    <>
      <PublicNavbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                About Us
              </p>

              <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
                Building Opportunities for Students and Professionals
              </h1>

              <p className="mt-8 text-lg text-gray-600 leading-8">
                Our platform connects talented individuals with meaningful
                opportunities across different departments and institutions. We
                aim to create an environment where growth, innovation, and
                collaboration thrive.
              </p>
            </div>
          </div>
        </section>
        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white border border-gray-200 p-10 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-[#001C43] font-medium">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Empowering Career Growth
              </h2>

              <p className="mt-6 text-gray-700 leading-8">
                We strive to provide accessible opportunities that help
                individuals develop their skills, gain experience, and build
                successful careers through meaningful employment and academic
                partnerships.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-10 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-[#001C43] font-medium">
                Our Vision
              </p>

              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Creating a Future of Innovation
              </h2>

              <p className="mt-6 text-gray-700 leading-8">
                We envision a future where every aspiring professional has
                access to opportunities that foster creativity, collaboration,
                and lifelong learning in a rapidly evolving world.
              </p>
            </div>
          </div>
        </section>
        {/* Values */}
        <section className="bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                Core Values
              </p>

              <h2 className="mt-4 text-4xl font-bold text-gray-900">
                What Drives Our Organization
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-14">
              <div className="border border-gray-200 p-8">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Integrity
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  We value honesty, transparency, and accountability in every
                  interaction.
                </p>
              </div>

              <div className="border border-gray-200 p-8">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Innovation
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  We encourage creativity and forward-thinking solutions that
                  inspire growth.
                </p>
              </div>

              <div className="border border-gray-200 p-8">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Collaboration
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  We believe teamwork and shared knowledge lead to stronger
                  communities.
                </p>
              </div>

              <div className="border border-gray-200 p-8">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Excellence
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  We continuously pursue high standards in service, education,
                  and professional development.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="bg-[#001C43] p-14 text-white">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-wide text-blue-200">
                Join Us
              </p>

              <h2 className="mt-5 text-4xl font-bold leading-tight">
                Be Part of a Growing Community
              </h2>

              <p className="mt-6 text-blue-100 leading-8">
                Whether you're seeking career opportunities, internships, or
                collaborative projects, we welcome passionate individuals who
                are ready to make an impact.
              </p>

              <Link
                href={"/jobs"}
                className="inline-flex mt-10 bg-red-600 text-white hover:bg-red-700 px-8 py-4 font-semibold transition"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
