import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="h-dvh flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-2xl">Welcome to MMCL Careers</h1>
        <p className="text-muted-foreground">Your dream job awaits here</p>
        </div>
        <div className="flex gap-4">
          <Button variant="default" size="lg">
            <Link href="/signup" prefetch>Get Started</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/login" prefetch>Login</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
