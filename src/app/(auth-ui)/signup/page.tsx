"use client";

import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center mt-8 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">QAngel Signup</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
              required
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
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
            <label
              htmlFor="repassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              type="text"
              id="repassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="show-password"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              checked={showPassword}
              onChange={handleTogglePassword}
            />
            <label
              htmlFor="show-password"
              className="ml-2 text-sm text-gray-600"
            >
              Show Password
            </label>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Signup
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
