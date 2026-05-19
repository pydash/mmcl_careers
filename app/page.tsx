import Link from "next/link";
import Image from "next/image";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <nav className="w-full bg-blue-950">
        <div className="mx-auto flex max-w-7xl items-center justify-around px-4 py-4 sm:px-8 md:px-12 md:py-4">
          {/* Left Side - Logo */}
          <Link href="/" className="flex items-center justify-center">
            <div className="flex">
              <Image
                src="/logo_block.png"
                alt="Logo"
                width={50}
                height={50}
                className="m-auto pr-1"
              />
              <Image src="/hrmo_logo.png" alt="Logo" width={50} height={50} />
            </div>
          </Link>
          {/* Right Side - Navigation */}
          <ul className="flex items-center justify-around gap-4 text-xs text-white">
            <li>
              <Link
                href="/jobs"
                className="px-3 py-2 transition hover:bg-red-600 hover:text-white"
              >
                Browse Jobs
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="px-3 py-2 transition hover:bg-red-600 hover:text-white"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                className="bg-red-600 px-3 py-2 transition hover:bg-red-700 hover:text-white"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>

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

      {/* FOOTER */}
      <footer className="bg-white border-t-2 border-red-600 px-6 py-14 text-black">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo_block.png" alt="Logo" width={45} height={45} />

              <Image src="/hrmo_logo.png" alt="Logo" width={45} height={45} />
            </div>

            <p className="mt-4 text-sm text-gray-700">
              MMCL is dedicated to building careers, empowering individuals, and
              fostering excellence in every opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-red-600">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>
                <Link href="/" className="hover:text-red-500">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/jobs" className="hover:text-red-500">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-red-500">
                  About
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-red-500">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-red-600">Contact</h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-red-500" />
                <p>MMCL Campus, Philippines</p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-red-500" />
                <p>+63 912 345 6789</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-red-600">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">
              <a href="#" className="transition hover:text-red-500">
                <FaFacebook />
              </a>

              <a href="#" className="transition hover:text-red-500">
                <FaInstagram />
              </a>

              <a href="#" className="transition hover:text-red-500">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 MMCL. All rights reserved.
        </div>
      </footer>
    </>
  );
}
