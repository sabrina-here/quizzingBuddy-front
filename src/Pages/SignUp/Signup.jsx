import React, { useContext, useState } from "react";
import Login from "./Login";
import { authContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Select from "react-select";

const options = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "professional", label: "Professional" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "researcher", label: "Researcher" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "freelancer", label: "Freelancer" },
  { value: "other", label: "Other" },
];

export default function Signup() {
  const { showLogin, handleShowLogin, handleShowSignup, handleUser } =
    useContext(authContext);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [passwordError, setPasswordError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPass = (e) => {
    const { name, value } = e.target;
    if (formData.password !== value) {
      setPasswordError("Password does not match");
    } else {
      setPasswordError("");
      if (
        formData.email.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.name.trim() !== ""
      ) {
        setSubmitDisabled(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const form = e.target;
    const userInfo = {
      ...formData,
      role: selectedOption ? selectedOption.value : selectedOption,
    };

    try {
      const response = await axiosSecure.post("/register", userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { accessToken, name, email, id, role } = response.data;
      handleUser(name, email, role, id);
      localStorage.setItem("token", accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name,
          email,
          role,
          id,
        })
      );
      form.reset();
      Swal.fire({
        position: "top-end",
        text: `Welcome ${name}`,
        width: 300,
        showCloseButton: true,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Error registering user:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again",
      });
    }
  };

  return (
    <div >
      <div className="w-[400px] h-[600px] border  rounded-md m-auto my-5">
        <div className="flex justify-between items-center">
          <button
            className={`p-3 w-[50%] font-medium text-lg ${
              !showLogin && `bg-primary text-white`
            }`}
            onClick={() => handleShowSignup()}
          >
            signup
          </button>
          <button
            className={`p-3 w-[50%] font-medium text-lg ${
              showLogin && `bg-primary text-white`
            }`}
            onClick={() => handleShowLogin()}
          >
            login
          </button>
        </div>
        {showLogin ? (
          <Login />
        ) : (
          <div className="p-7">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your Full Name"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role/Profession{" "}
                  <span className="text-light text-md">(optional)</span>
                </label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
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
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="my-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleConfirmPass}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  type="submit"
                  className={`${
                    submitDisabled ? "bg-medium" : "bg-primary cursor-pointer"
                  }  text-white p-2 mx-auto px-4 text-lg font-semibold rounded-sm`}
                  disabled={submitDisabled}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
