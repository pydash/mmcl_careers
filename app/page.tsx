import Link from "next/link";

import PublicNavbar from "@/components/public-navbar";
import PublicFooter from "@/components/public-footer";

export default function Home() {
  return (
    <>
      <PublicNavbar />

      {/* MAIN */}
      <main className="bg-white text-black">
        {/* HERO SECTION */}
        <section className="bg-blue-950 px-6 py-20 text-white">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Build Your Future with MMCL
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm text-gray-300 sm:text-base md:text-lg">
              Discover meaningful opportunities, grow your career, and become
              part of a community that values excellence, integrity, and
              innovation.
            </p>

            <div className="mt-8">
              <Link
                href="/register"
                className="bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT / CULTURE SECTION */}
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-blue-950">
                What Makes MMCL Different?
              </h2>

              <p className="mt-4 text-gray-600">
                We foster a culture where people thrive, collaborate, and grow
                together.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="border border-gray-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-red-600">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-blue-950">
                  Innovation
                </h3>

                <p className="mt-3 text-gray-600">
                  We encourage fresh ideas and creative thinking that drive
                  meaningful impact.
                </p>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-red-600">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-blue-950">
                  Collaboration
                </h3>

                <p className="mt-3 text-gray-600">
                  Teamwork is at the heart of everything we do, empowering every
                  individual to contribute.
                </p>
              </div>

              {/* Card 3 */}
              <div className="border border-gray-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-red-600">
                <div className="mb-4 h-1 w-12 bg-red-600"></div>

                <h3 className="text-xl font-semibold text-blue-950">
                  Integrity
                </h3>

                <p className="mt-3 text-gray-600">
                  We uphold transparency, honesty, and accountability in all our
                  actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY APPLY SECTION */}
        <section className="bg-gray-100 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-blue-950">
                Why Apply at MMCL?
              </h2>

              <p className="mt-4 text-gray-600">
                Join a workplace where your skills and ambitions matter.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold text-red-600">
                  Career Growth
                </h3>

                <p className="mt-3 text-gray-600">
                  Access professional development opportunities and continuous
                  learning programs.
                </p>
              </div>

              <div className="bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold text-red-600">
                  Supportive Environment
                </h3>

                <p className="mt-3 text-gray-600">
                  Work alongside passionate professionals in a positive and
                  inclusive culture.
                </p>
              </div>

              <div className="bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold text-red-600">
                  Competitive Benefits
                </h3>

                <p className="mt-3 text-gray-600">
                  Enjoy compensation packages and benefits that value your
                  contribution.
                </p>
              </div>

              <div className="bg-white p-6 shadow-md">
                <h3 className="text-xl font-semibold text-red-600">
                  Purpose-Driven Work
                </h3>

                <p className="mt-3 text-gray-600">
                  Be part of meaningful initiatives that create real impact in
                  the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-blue-950 px-6 py-20 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>

            <p className="mt-4 text-gray-300">
              Become part of MMCL and discover opportunities that empower your
              future.
            </p>

            <div className="mt-8">
              <Link
                href="/register"
                className="bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                Join MMCL Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
