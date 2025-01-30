import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { authContext } from "../Providers/AuthProvider";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div>loading</div>
      </div>
    );
  if (user) return children;
  return (
    <Navigate
      to={"/signup"}
      state={{ from: location }}
      replace={true}
    ></Navigate>
  );
}

export default PrivateRoute;
