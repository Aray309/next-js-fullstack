"use client";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const UserVerification = () => {
  const [code, setCode] = useState<string>("");
  const params = useParams<{ username: string }>();
  const router = useRouter();

  const handleUserEnterCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 6) return;

    const integerRegex = /^\d*$/;
    console.log(value);
    if (integerRegex.test(value)) {
      setCode(event.target.value);
    }
  };
  //handle form submit
  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post<ApiResponse>("/api/verify-user", {
        username: params.username,
        code,
      });
      console.log("Before Toast", response);
      toast.success("Verification successful", {
        autoClose: 3000,
        position: "top-center",
      });

      router.replace("/login");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("AXIOS", axiosError);
      toast.error("Failed to verify", {
        autoClose: 5000,
        position: "top-center",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center mt-8 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6 text-center">
          User verification
        </h3>
        <h6 className="text-sm font-normal mb-6 text-left">
          Please enter the code that we send to email you email
        </h6>
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              User verification code
            </label>
            <input
              id="code"
              name="code"
              value={code}
              onChange={handleUserEnterCode}
              type="text"
              className="no-spinner mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserVerification;
