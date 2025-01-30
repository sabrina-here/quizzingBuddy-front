import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleUser = (name, email) => {
    setUser({ name, email });
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleShowSignup = () => {
    setShowLogin(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user context or state
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      handleUser(parsedUser.name, parsedUser.email);
    }
  }, []);

  const authInfo = {
    showLogin,
    handleShowLogin,
    handleShowSignup,
    user,
    handleUser,
    handleLogout,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
