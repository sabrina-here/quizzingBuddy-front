import { Children, createContext, useState } from "react";

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

  const authInfo = {
    showLogin,
    handleShowLogin,
    handleShowSignup,
    user,
    handleUser,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
