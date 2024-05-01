import { useState, useEffect, createContext, useContext } from "react";

const Context = createContext();

export const CommentsDataProvider = ({ children }) => {
  const [comments, setComments] = useState();
  const [refetching, setRefetching] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/comments");
      const data = await response.json();
      setComments(data);
      setRefetching(false);
    }

    fetchData();

    return () => {};
  }, [refetching]);

  const refetch = () => {
    setRefetching(true);
  }

  return (
    <Context.Provider value={{ comments, refetch }}>
      {children}
    </Context.Provider>
  );
};

export const useComments = () => useContext(Context);