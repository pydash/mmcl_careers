import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex bg-white min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <img
            src="/logo_horizontal.png"
            alt="logo"
            className="h-10 object-contain"
          />
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
