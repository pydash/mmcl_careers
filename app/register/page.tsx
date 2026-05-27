import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 flex items-center">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 border border-gray-200 bg-white shadow-sm">
        {/* Left Section */}
        <div className="bg-blue-950 p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs text-white uppercase tracking-[0.2em]">
              Create Account
            </p>

            <h1 className="text-white mt-4 text-3xl lg:text-4xl font-bold leading-tight">
              Start Your Career Journey With Us
            </h1>

            <p className="text-white mt-5 leading-7 text-base">
              Register an account to explore job opportunities, manage
              applications, and connect with departments looking for talented
              individuals.
            </p>
          </div>

          <div className="mt-10 border-t border-white pt-5">
            <p className="text-white text-sm">Already have an account?</p>

            <Link
              href="/login"
              className="inline-flex mt-3 bg-red-600 text-white px-5 py-2 text-sm font-medium hover:bg-red-700 hover:text-white transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Registration Form
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Create Your Account
            </h2>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                  />
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your surname"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-950"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 border border-gray-300"
                />

                <p className="text-xs text-gray-600 leading-5">
                  I agree to the terms and conditions and consent to the
                  processing of my personal information.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
