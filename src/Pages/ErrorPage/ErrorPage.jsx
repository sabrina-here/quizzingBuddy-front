import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { NavLink } from "react-router";

export default function ErrorPage() {
  return (
    <div>
      <Header></Header>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[400px] h-[200px] border-4 border-primary/20 uppercase rounded-sm flex flex-col justify-center items-center text-lg font-semibold">
          <div>oops! an error occurred</div>
          <div>
            {" "}
            <button className="p-2 mx-2 my-4 border-2 border-accent bg-accent/10 hover:bg-accent/20 hover:text-xl px-5 rounded-lg font-medium text-lg">
              <NavLink to={"/"}>back to home</NavLink>
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
