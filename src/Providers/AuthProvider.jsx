import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (name, email) => {
    setUser({ name, email });
    setLoading(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setLoading(false);
  };
  const handleShowSignup = () => {
    setShowLogin(false);
    setLoading(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user context or state
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      handleUser(parsedUser.name, parsedUser.email);
      setLoading(false);
    }
  }, []);

  const authInfo = {
    showLogin,
    handleShowLogin,
    handleShowSignup,
    user,
    handleUser,
    handleLogout,
    loading,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
