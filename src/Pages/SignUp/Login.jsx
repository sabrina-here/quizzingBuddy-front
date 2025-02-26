import React, { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { authContext } from "../../Providers/AuthProvider";

export default function Login() {
  const { handleUser } = useContext(authContext);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formData.email.trim() !== "" && formData.password.trim() !== "") {
      setSubmitDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const form = e.target;

    try {
      const response = await axiosSecure.post("/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.email) {
        const { name, email, role, accessToken, id } = response.data;
        handleUser(name, email, role, id);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify({ name, email, role, id }));
        form.reset();
        Swal.fire({
          position: "top-end",
          text: `Welcome ${name}`,
          width: 300,
          showCloseButton: true,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Error Logging user:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again",
      });
    }
  };

  return (
    <div className="p-7">
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <button
              type="submit"
              className={`${
                submitDisabled ? "bg-medium" : "bg-primary cursor-pointer"
              }  text-white p-2 mx-auto px-4 text-lg font-semibold rounded-sm`}
              disabled={submitDisabled}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
