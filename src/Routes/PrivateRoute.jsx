import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { authContext } from "../Providers/AuthProvider";
import Loader from "../Components/Loader";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  if (loading) return <Loader />;
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
