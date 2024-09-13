"use client";
import Loader from "@/components/loader";
import useDebounce from "@/helpers/custom-hooks/useDebounce";
import { ApiResponse } from "@/types/ApiResponse";
import SignupSchema, {
  SignupData,
  SignupErrors,
} from "@/validation-schema/frontend/signup";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [formError, setFormError] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const debounceUsername = useDebounce(signupData.username, 800);
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (debounceUsername) {
        setCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get<ApiResponse>(
            `api/unique-user?username=${debounceUsername}`
          );
          toast.success(response.data.message, {
            autoClose: 1000,
            position: "top-center",
          });
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          toast.error(
            axiosError.response?.data.message ?? "Error checking username",
            {
              autoClose: 1000,
              position: "top-center",
            }
          );
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setCheckingUsername(false);
        }
      }
    })();
  }, [debounceUsername]);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      if (value.length >= 25 || value[0] === " ") return;
    }

    setSignupData((prevData) => ({
      ...prevData,
      [name as keyof SignupData]: value,
    }));
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = SignupSchema.safeParse(signupData);

    if (!result.success) {
      // Set errors if validation fails
      const validationErrors = result.error.format();
      setFormError(
        Object.keys(validationErrors).reduce((acc, key) => {
          const errorItem =
            validationErrors[key as keyof typeof validationErrors];
          if (Array.isArray(errorItem)) {
            // Directly handle the case where errorItem is an array of strings
            acc[key as keyof SignupErrors] = errorItem[0];
          } else if (errorItem?._errors?.length) {
            // Handle the case where errorItem is an object with _errors property
            acc[key as keyof SignupErrors] = errorItem._errors[0];
          }
          return acc;
        }, {} as SignupErrors)
      );
      return;
    }

    setFormError({});
    setIsSubmitting(true);
    const data = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
    };
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        router.replace(`/verification/${signupData.username}`);
      }, 3000);

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your sign-up. Please try again.");

      toast.error(errorMessage, { autoClose: 5000, position: "top-center" });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center mt-8 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="name"
              name="username"
              value={signupData.username}
              onChange={handleFormData}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formError.username && !signupData.username && (
              <p className="text-red-500 text-sm">{formError.username}</p>
            )}
            {checkingUsername && <Loader height="35" width="35" />}
            {!checkingUsername && usernameMessage && signupData.username && (
              <p
                className={`text-sm ${
                  usernameMessage === "Username is unique"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameMessage}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter email
            </label>
            <input
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleFormData}
            />
            {formError.email && !signupData.email && (
              <p className="text-red-500 text-sm">{formError.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Enter password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={signupData.password}
                onChange={handleFormData}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {!showPassword ? <span>Show</span> : <span>Hide</span>}
              </button>
            </div>
            {formError.password && !signupData.password && (
              <p className="text-red-500 text-sm">{formError.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="repassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              type="text"
              id="repassword"
              name="rePassword"
              value={signupData.rePassword}
              onChange={handleFormData}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {(formError.rePassword || !signupData.rePassword) && (
              <p className="text-red-500 text-sm">{formError.rePassword}</p>
            )}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? (
                <>
                  <span>Please wait...</span>
                </>
              ) : (
                "Signup"
              )}
            </button>
          </div>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
