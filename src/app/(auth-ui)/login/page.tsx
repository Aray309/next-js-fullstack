"use client";

import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loginInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: loginInput.email,
      password: loginInput.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Login failed", {
          autoClose: 3000,
          position: "top-center",
        });
      } else {
        toast.error("Login Failed", {
          autoClose: 3000,
          position: "top-center",
        });
      }
    }

    if (result?.url) router.replace("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLoginForm}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
              onChange={loginInputHandler}
              value={loginInput.email}
            />
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
                onChange={loginInputHandler}
                value={loginInput.password}
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {!showPassword ? <span>Show</span> : <span>Hide</span>}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-left text-sm text-gray-600">
              <Link
                href="/forget-password"
                className="text-blue-500 hover:underline"
              >
                Forget password
              </Link>
            </p>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Signin
            </button>
          </div>
          <p className="text-center text-sm text-gray-600">
            Sign up first{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
