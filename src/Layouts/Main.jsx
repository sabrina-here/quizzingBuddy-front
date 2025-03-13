import React, { lazy, Suspense } from "react";
// import Header from "../Components/Header";
const Header = lazy(() => import("../Components/Header"));
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import Loader from "../Components/Loader";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Suspense fallback={<Loader />}>
        <Header></Header>
      </Suspense>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}
