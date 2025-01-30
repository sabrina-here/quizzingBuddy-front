import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { authContext } from "../Providers/AuthProvider";

function PrivateRoute({ children }) {
  const { user } = useContext(authContext);
  const location = useLocation();
  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center">
  //       <div>
  //         <span className="loading loading-spinner loading-lg"></span>
  //       </div>
  //     </div>
  //   );
  if (user) return children;
  return (
    <Navigate to={"/signup"} state={{ from: location }} replace></Navigate>
  );
}

export default PrivateRoute;
