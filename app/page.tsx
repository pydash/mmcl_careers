import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <Image
          src="/logo_full.png"
          alt="MMCL Careers"
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-bold mt-4">Welcome to MMCL Careers</h1>
        <p className="mt-2 text-lg">
          Your gateway to exciting job opportunities at MMCL.
        </p>
        <div className="flex mt-4">
          <Button>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" className="ml-4">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
