import React from "react";
import { buildService } from "../services";

export const ServiceContext = React.createContext(null);

export const ServiceProvider = ({ children }) => {
  const services = buildService();

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
