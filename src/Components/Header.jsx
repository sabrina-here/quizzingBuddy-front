import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { authContext } from "../Providers/AuthProvider";

export default function Header() {
  const { user, handleShowLogin, handleShowSignup } = useContext(authContext);
  // const { user, logOut } = useContext(AuthContext);

  // const handleLogOut = () => {
  //   logOut.then(() => {}).catch((err) => console.error(err));
  // };

  const userNav = (
    <>
      <li className="px-3 hover:font-medium">
        <NavLink to={"/myTopics"}>My Topics</NavLink>
      </li>
      <li className="px-3 hover:font-medium">
        <Link to={"/myQuiz"}>My Quizzes</Link>
      </li>
      <li className="px-3 hover:font-medium">
        <Link to={"/logout"}>Logout</Link>
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
