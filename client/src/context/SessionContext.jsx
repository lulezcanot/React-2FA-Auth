import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    console.log("the useEffect runs: ", storedUser);
    if(storedUser){
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [])

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user");
  };

  const logout = () => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, loading, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
