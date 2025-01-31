import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { authContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export default function Header() {
  const { user, handleShowLogin, handleShowSignup, handleLogout } =
    useContext(authContext);

  const [topics, setTopics] = useState([]);
  const axiosSecure = useAxiosSecure();
  const fetchTopics = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosSecure.get("/getTopics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTopics(response.data.topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [user]);

  const userNav = (
    <>
      <li className="px-3 hover:font-medium">
        <div className="relative inline-block text-left group cursor-pointer">
          <NavLink to={"/myTopics"}> My Topics </NavLink>
          <div className="absolute -left-1 w-48 text-dark bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-200 ease-in-out hidden">
            <ul className="py-2">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <NavLink to={`/topics/${topic}`}>{topic}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      <li className="px-3 hover:font-medium">
        <Link to={"/myQuizes"}>My Quizzes</Link>
      </li>
      <li
        onClick={handleLogout}
        className="hover:text-dark rounded-sm hover:bg-accent px-3 cursor-pointer hover:font-medium"
      >
        Logout
      </li>
    </>
  );
  const guestNav = (
    <>
      <li className="px-3 hover:font-medium">
        <NavLink to={"/newQuiz"}>New Quiz</NavLink>
      </li>
      <li className="px-3 hover:font-medium">
        <Link to={"/sampleQuiz"}>Sample Quiz</Link>
      </li>
    </>
  );

  return (
    <div className="sm:w-full max-w-[1920px] bg-primary text-white p-2 sticky top-0 z-40">
      {/* --------------- nav for large screens ------------ */}
      <div className="flex  items-center justify-between w-full ">
        <div className="flex justify-between items-center">
          {/* <Link to="/" className=" mr-14 p-2">

            <img className="w-[160px]" src={logo} alt="restaurant" />
          </Link> */}
          <p>
            <Link to={"/"}>logo</Link>
          </p>
        </div>
        <div>
          {" "}
          <ul className="flex justify-evenly px-1 text-center">
            {user ? userNav : guestNav}
          </ul>
        </div>
        <div className="">
          {user ? (
            <button className="bg-accent text-dark font-bold p-2 rounded-sm ">
              {user.name}
            </button>
          ) : (
            <div className="text-accent">
              <Link
                className="hover:font-medium"
                to={"/signup"}
                onClick={() => handleShowLogin()}
              >
                Login
              </Link>{" "}
              /{" "}
              <Link
                className="hover:font-medium"
                to={"/signup"}
                onClick={() => handleShowSignup()}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
