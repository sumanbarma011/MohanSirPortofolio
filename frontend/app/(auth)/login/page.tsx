import { LoginForm } from "@/features/core/auth/components/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* login form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
