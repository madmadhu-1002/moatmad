"use client"; // Context must be a Client Component

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [searchVeh, setSearchVeh] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [bidPrices, setBidPrices] = useState([]);

  return (
    <GlobalContext.Provider value={{ searchVeh, setSearchVeh, selectedVehicles, setSelectedVehicles, bidPrices, setBidPrices }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
