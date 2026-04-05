import { TriangleAlert } from "lucide-react";

export default function NotPermittedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <TriangleAlert className="size-8" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}
