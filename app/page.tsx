import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main>
        <h1>Welcome to MMCL Careers</h1>
        <p>Your dream job awaits at MMCL Careers</p>
        <div className="flex flex-col items-center justify-center py-2">
          <Button variant="destructive" size="lg">
            Explore Job Openings
          </Button>
        </div>
      </main>
    </>
  );
}
