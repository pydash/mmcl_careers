import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function RecoveryForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Get your password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@mail.com"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Confirm Email
                </Button>
                <FieldDescription className="text-center">
                  Remember your password?{" "}
                  <a href="/login" className="text-red-600 hover:text-red-700">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs">
        If you don't receive an email within a few minutes, check your spam
        folder or{" "}
        <a href="#" className="text-red-600 hover:text-red-700">
          contact support
        </a>
        .
      </FieldDescription>
    </div>
  );
}
