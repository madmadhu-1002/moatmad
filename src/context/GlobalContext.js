"use client"; // Context must be a Client Component

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [searchVeh, setSearchVeh] = useState(null);

  return (
    <GlobalContext.Provider value={{ searchVeh, setSearchVeh }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
