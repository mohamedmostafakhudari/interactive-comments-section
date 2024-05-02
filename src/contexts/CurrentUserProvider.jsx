import { useState, useEffect, createContext, useContext } from "react";

const Context = createContext();

const currentUser = {
  image: {
    png: "./assets/images/avatars/image-juliusomo.png",
    webp: "./assets/images/avatars/image-juliusomo.webp"
  },
  username: "juliusomo"
};

export const CurrentUserDataProvider = ({ children }) => {
  return (
    <Context.Provider value={currentUser}>
      {children}
    </Context.Provider>
  );
};

export const useCurrentUser = () => useContext(Context);