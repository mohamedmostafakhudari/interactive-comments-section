import { useState, useEffect, createContext, useContext } from "react";

const Context = createContext();

export const CurrentUserDataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/currentUser");
      console.log(response);
      const data = await response.json();
      setCurrentUser(data);
    }
    fetchData();
    
    return () => {};
  }, []);

  return (
    <Context.Provider value={currentUser}>
      {children}
    </Context.Provider>
  );
};

export const useCurrentUser = () => useContext(Context);