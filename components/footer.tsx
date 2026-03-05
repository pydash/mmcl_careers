import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white py-12 px-6 border-t border-gray-200"
    >
      <div className="flex h-1 -mx-6 -mt-12 mb-12">
        <div className="w-[60%] bg-red-500" />
        <div className="w-[40%] bg-blue-900" />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <img
            src="/logo_horizontal.png"
            alt="MMCL Logo"
            className="h-10 mb-2"
          />
          <p className="text-sm leading-relaxed">
            Mapúa MCL Human Resources <br />
            Management Office
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">Quick Links</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/jobs"
                className="hover:text-red-500 transition-colors"
              >
                Open Positions
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:text-red-500 transition-colors"
              >
                About MMCL
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-red-500 transition-colors"
              >
                HR Login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Contact HR</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>recruitment@mcl.edu.ph</li>
            <li>049-832-4068</li>
            <li>Pulo Diezmo Road, Cabuyao, Laguna</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-200 text-xs text-gray-400 text-center">
        © 2026 Mapúa Malayan Colleges Laguna. All rights reserved.
      </div>
    </footer>
  );
}
