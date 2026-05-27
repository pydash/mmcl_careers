import Link from "next/link";
import Image from "next/image";

export default function PublicNavbar() {
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
    </>
  );
}
