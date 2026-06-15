"use client";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { cn } from "../../../../lib/utils";
import { useForm } from "@tanstack/react-form";
import { Label } from "../../../../components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAxiosError } from "axios";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { loginAdminSchema, LoginType } from "../auth.schema";
import { useAuthStore } from "../store/userStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loginFn = useAuthStore((s) => s.login);
  const defaultValues: LoginType = {
    email: "suman011@gmail.com",
    password: "Suman123$",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const resData = await loginFn(value);
        // console.log(resData);
        toast("Login succesful");
        if (resData.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          // messages instead of message
          setErrors(error.response?.data?.errors || error.message);
          toast(error.response?.data?.errors[0] || error.message);
        } else {
          setErrors(["Internal Server Error Occured"]);
          toast("Internal Server Error Occured");
        }
      }
    },

    // validating input with zod
    validators: {
      onChange: loginAdminSchema,
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    autoComplete="off"
                    placeholder="m@example.com"
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <p className="text-sm text-left font-medium text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name}>Password</Label>
                    <a
                      href="#"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                  />
                  <div className="absolute cursor-pointer right-4 top-8 transition-transform duration-200 ease-in">
                    {showPassword ? (
                      <EyeIcon onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeClosedIcon onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <p className="text-sm text-left font-medium text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* api errors or root*/}
            {/* <ShowFormError errors={errors} /> */}

            {/* Form Actions */}
            <div className="flex flex-col gap-2">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
