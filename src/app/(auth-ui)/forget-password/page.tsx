"use client";

import { ApiResponse } from "@/types/ApiResponse";
import ForgetPasswordSchema, {
  ForgetPasswordData,
  ForgetPaswordErrors,
} from "@/validation-schema/frontend/forgetPassword";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [forgetPasswordData, setForgetPasswordData] =
    useState<ForgetPasswordData>({
      email: "",
      newPassword: "",
      newRePassword: "",
    });
  const [formError, setFormError] = useState<ForgetPaswordErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  //     (async () => {
  //       if (debounceUsername) {
  //         setCheckingUsername(true);
  //         setUsernameMessage("");
  //         try {
  //           const response = await axios.get<ApiResponse>(
  //             `api/unique-user?username=${debounceUsername}`
  //           );
  //           toast.success(response.data.message, {
  //             autoClose: 1000,
  //             position: "top-center",
  //           });
  //           setUsernameMessage(response.data.message);
  //         } catch (error) {
  //           const axiosError = error as AxiosError<ApiResponse>;
  //           toast.error(
  //             axiosError.response?.data.message ?? "Error checking username",
  //             {
  //               autoClose: 1000,
  //               position: "top-center",
  //             }
  //           );
  //           setUsernameMessage(
  //             axiosError.response?.data.message ?? "Error checking username"
  //           );
  //         } finally {
  //           setCheckingUsername(false);
  //         }
  //       }
  //     })();
  //   }, [debounceUsername]);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForgetPasswordData((prevData) => ({
      ...prevData,
      [name as keyof ForgetPasswordData]: value,
    }));
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = ForgetPasswordSchema.safeParse(forgetPasswordData);

    if (!result.success) {
      // Set errors if validation fails
      const validationErrors = result.error.format();
      setFormError(
        Object.keys(validationErrors).reduce((acc, key) => {
          const errorItem =
            validationErrors[key as keyof typeof validationErrors];
          if (Array.isArray(errorItem)) {
            // Directly handle the case where errorItem is an array of strings
            acc[key as keyof ForgetPaswordErrors] = errorItem[0];
          } else if (errorItem?._errors?.length) {
            // Handle the case where errorItem is an object with _errors property
            acc[key as keyof ForgetPaswordErrors] = errorItem._errors[0];
          }
          return acc;
        }, {} as ForgetPaswordErrors)
      );
      return;
    }

    setFormError({});
    setIsSubmitting(true);
    const data = {
      email: forgetPasswordData.email,
      newPassword: forgetPasswordData.newPassword,
    };
    try {
      const response = await axios.post<ApiResponse>(
        "/api/forget-password",
        data
      );

      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        router.replace(`/login`);
      }, 3000);

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during forgetting password:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with forgetting password. Please try again.");

      toast.error(errorMessage, { autoClose: 5000, position: "top-center" });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center mt-8 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h5 className="text-xl font-bold mb-6 text-center">
          {" "}
          Do not worry we will help you to get new password
        </h5>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Email
            </label>
            <input
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="email"
              name="email"
              value={forgetPasswordData.email}
              onChange={handleFormData}
            />
            {formError.email && !forgetPasswordData.email && (
              <p className="text-red-500 text-sm">{formError.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Enter New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "newPassword"}
                id="newPassword"
                name="newPassword"
                value={forgetPasswordData.newPassword}
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
            {formError.newPassword && !forgetPasswordData.newPassword && (
              <p className="text-red-500 text-sm">{formError.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="renewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re Enter Password
            </label>
            <input
              type="text"
              id="newRePassword"
              name="newRePassword"
              value={forgetPasswordData.newRePassword}
              onChange={handleFormData}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {(formError.newRePassword || !forgetPasswordData.newRePassword) && (
              <p className="text-red-500 text-sm">{formError.newRePassword}</p>
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
                "Submit"
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

export default ForgetPassword;
