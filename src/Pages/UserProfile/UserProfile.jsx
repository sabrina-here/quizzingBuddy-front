import React, { useContext, useRef, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { authContext } from "../../Providers/AuthProvider";
import Select from "react-select";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import { useQuery } from "react-query";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import PreferredTopicBox from "./PreferredTopicBox";

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

const fetchStats = async (userId, token) => {
  const response = await axios.get(`/stats/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default function UserProfile() {
  const { user, handleUser } = useContext(authContext);
  const [updateRole, setUpdateRole] = useState(user.role);
  const [showSelect, setShowSelect] = useState(false);
  const [preferredTopic, setPreferredTopic] = useState("");
  const inputRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [topics, setTopics] = useState([]);
  const [statFound, setStatFound] = useState(true);
  const [topicsFound, setTopicsFound] = useState(true);

  const {
    data: topicsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["preferredTopics"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.get(`/preferredTopics/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTopics(data.data.preferredTopics);
      return data;
    },
  });

  // Fetch quiz stats
  const {
    data: stats,
    isLoading: loadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["quizStats", user.id],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.get(`/stats/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.message === "No quizzes found for this user") {
        setStatFound(false);
      }
      return response.data;
    },
    enabled: !!user.id,
  });

  if (isLoading || loadingStats) return <Loader />;
  if (topicsData.message === "No preferences found for this user") {
    setTopicsFound(false);
  }

  const deletePreferredTopic = async (preferredTopicName) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosSecure.delete(`/preferredTopics/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { preferredTopic: preferredTopicName },
      });

      refetch();
    } catch (error) {
      console.error("Error deleting topic:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error deleting topic. Please try again",
      });
    }
  };

  const handleRoleUpdate = async () => {
    setShowSelect(false);
    try {
      const role = updateRole ? updateRole.value : updateRole;
      const token = localStorage.getItem("token");
      const response = await axiosSecure.patch(
        `/updateUser/${user.id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      handleUser(user.name, user.email, role, user.id);
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating role. Please Try again",
      });
    }
  };

  const handlePreferredTopicChange = (e) => {
    const { name, value } = e.target;
    setPreferredTopic(value);
  };

  const handleAddTopic = async () => {
    const userInfo = {
      userId: user.id,
      email: user.email,
      preferredTopic,
    };
    try {
      const token = localStorage.getItem("token");

      const response = await axiosSecure.post("/preferredTopics", userInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      refetch();
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error adding preference:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again",
      });
    }

    inputRef.current.value = "";
  };
  return (
    <div className="lg:max-w-[90%] my-10 mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {/* ----------------- top left profile details --------------- */}
        <div className="border-4 rounded-md border-light p-4">
          profile details
          <div>
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
                disabled
                placeholder={user.name}
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
                disabled
                placeholder={user.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Role/Profession{" "}
              </label>
              <>
                {showSelect ? (
                  <div className="flex justify-between items-center">
                    <div className="w-full">
                      <Select
                        defaultValue={updateRole}
                        onChange={setUpdateRole}
                        options={options}
                        className="w-full"
                      />
                    </div>
                    <button
                      className=" px-4 py-2 border-2 rounded-md border-green-500 m-2 hover:font-bold hover:bg-green-500/10"
                      onClick={handleRoleUpdate}
                    >
                      update
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <input
                      name="email"
                      type="email"
                      disabled
                      placeholder={user.role}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />{" "}
                    <button
                      className=" px-4 py-2 border-2 rounded-md border-accent m-2 hover:font-bold hover:bg-accent/10"
                      onClick={() => setShowSelect(true)}
                    >
                      change
                    </button>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>

        {/* ---------------- top right pie chart ------------------ */}
        <div className="border-4 rounded-md border-light p-5">
          <div className="flex justify-between items-center">
            <div>
              {statFound ? (
                <div className="relative w-56 h-56 flex justify-center items-center">
                  <PieChart
                    data={[
                      {
                        title: "Easy",
                        value: Number(stats?.easyMarks) || 0,
                        color: "#16a34a",
                      },
                      {
                        title: "Medium",
                        value: Number(stats?.mediumMarks) || 0,
                        color: "#febf00",
                      },
                      {
                        title: "Hard",
                        value: Number(stats?.hardMarks) || 0,
                        color: "#f66045",
                      },
                      {
                        title: "Remaining",
                        value: Math.max(
                          100 -
                            (Number(stats.easyMarks) +
                              Number(stats.mediumMarks) +
                              Number(stats.hardMarks)),
                          0
                        ),
                        color: "#d1d5db", // Gray (Tailwind gray-300)
                      },
                    ]}
                    lineWidth={40}
                    animate
                  />

                  {/* Centered Text */}
                  <div className="absolute text-center">
                    <p className="text-lg font-semibold">{stats.avgMarks}%</p>
                    <p className="text-sm text-gray-600">Avg Marks</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-56 h-56 flex justify-center items-center">
                  <PieChart
                    data={[
                      {
                        title: "One", //right
                        value: 10,
                        color: "#5c697d",
                      },
                    ]}
                    lineWidth={40}
                    animate
                  />
                  {/* Centered Text */}
                  <div className="absolute text-center">
                    <p className="text-lg font-semibold">0%</p>
                    <p className="text-sm text-gray-600">Avg Marks</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 ">
              <p>Total Quizzes: {stats.totalQuizzes}</p>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-[#16a34a] inline-block rounded-full"></span>
                <p className=" font-medium">
                  Easy Quizzes: {stats.easyQuizzes} ({stats.easyMarks}%)
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-[#febf00] inline-block rounded-full"></span>
                <p className=" font-medium">
                  Medium Quizzes: {stats.mediumQuizzes} ({stats.mediumMarks}%)
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-[#f66045] inline-block rounded-full"></span>
                <p className=" font-medium">
                  Hard Quizzes: {stats.hardQuizzes} ({stats.hardMarks}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---- bottom --- */}
      <div>
        <div className="border-4 rounded-md border-light p-4 my-5">
          <div className="flex justify-between items-end w-1/4">
            <div className="my-3">
              <label
                htmlFor="preference"
                className="block text-sm font-medium text-gray-700"
              >
                Add Preference
              </label>
              <div className="flex justify-between items-center">
                <input
                  name="preference"
                  type="preference"
                  onChange={handlePreferredTopicChange}
                  ref={inputRef}
                  placeholder={"input preferred topic "}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  className="mt-1 ms-2 rounded-md p-2 bg-green-600 text-white hover:font-bold flex justify-between items-center"
                  onClick={handleAddTopic}
                >
                  <IoMdAdd className="me-1 font-bold text-md" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------- show all the preferences ---------------- */}
          <div>
            {topicsFound && (
              <div className="flex flex-wrap gap-4">
                {topics.map((topic, index) => (
                  <PreferredTopicBox
                    key={index}
                    topic={topic}
                    deletePreferredTopic={deletePreferredTopic}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
