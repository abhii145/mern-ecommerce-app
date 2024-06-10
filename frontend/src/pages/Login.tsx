/* eslint-disable @typescript-eslint/no-var-requires */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const loginSchema = z.object({
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "gender is required" }),
  }),
  dateOfBirth: z.coerce.date(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
  };

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();

        const { user } = await signInWithPopup(auth, provider);
          console.log({
            name: user.displayName!,
            email: user.email!,
            photo: user.photoURL!,
          });

        toast.success("Sign In Success");

    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-2 font-medium">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className={`p-2 border rounded ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="mb-2 font-medium">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className={`p-2 border rounded ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col items-center space-y-2">
          <p className="mb-2">Already Signed In Once</p>
          <button
            onClick={loginHandler}
            className="flex items-center bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition duration-300"
          >
            <FcGoogle className="mr-2" /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
