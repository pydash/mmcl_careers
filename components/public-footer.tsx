import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function PublicFooter() {
  return (
    <>
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
