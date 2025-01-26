import React from "react";

export default function Login() {
  return (
    <div className="p-7">
      <div className="mt-10">
        <form>
          <div className="my-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <button
              type="submit"
              className="bg-primary text-white p-2 mx-auto px-4 text-lg font-semibold rounded-sm"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
