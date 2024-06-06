import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = loginSchema
  .extend({
    name: z.string().min(1),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormInputs = z.infer<typeof loginSchema>;
type SignupFormInputs = z.infer<typeof signupSchema>;

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", name: "" },
  });

  const onLoginSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    // Handle login
  };

  const onSignupSubmit = (data: SignupFormInputs) => {
    console.log("Signup Data:", data);
    // Handle signup
  };

  const toggleForm = () => {
    if (isLogin) {
      loginForm.reset();
    } else {
      signupForm.reset();
    }
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 ${
            isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-l`}
          onClick={toggleForm}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${
            !isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-r`}
          onClick={toggleForm}
        >
          Signup
        </button>
      </div>

      {isLogin ? (
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
          <div className="flex flex-col">
            <label htmlFor="login-email" className="mb-2 font-medium">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              {...loginForm.register("email")}
              className={`p-2 border rounded ${
                loginForm.formState.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {loginForm.formState.errors.email && (
              <p className="text-red-500 mt-1">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="login-password" className="mb-2 font-medium">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              {...loginForm.register("password")}
              className={`p-2 border rounded ${
                loginForm.formState.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {loginForm.formState.errors.password && (
              <p className="text-red-500 mt-1">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={signupForm.handleSubmit(onSignupSubmit)}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
          <div className="flex flex-col">
            <label htmlFor="signup-name" className="mb-2 font-medium">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              {...signupForm.register("name")}
              className={`p-2 border rounded ${
                signupForm.formState.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {signupForm.formState.errors.name && (
              <p className="text-red-500 mt-1">
                {signupForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="signup-email" className="mb-2 font-medium">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              {...signupForm.register("email")}
              className={`p-2 border rounded ${
                signupForm.formState.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {signupForm.formState.errors.email && (
              <p className="text-red-500 mt-1">
                {signupForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="signup-password" className="mb-2 font-medium">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              {...signupForm.register("password")}
              className={`p-2 border rounded ${
                signupForm.formState.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {signupForm.formState.errors.password && (
              <p className="text-red-500 mt-1">
                {signupForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="signup-confirm-password"
              className="mb-2 font-medium"
            >
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              {...signupForm.register("confirmPassword")}
              className={`p-2 border rounded ${
                signupForm.formState.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {signupForm.formState.errors.confirmPassword && (
              <p className="text-red-500 mt-1">
                {signupForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;
