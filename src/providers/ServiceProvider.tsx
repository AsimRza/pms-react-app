import React from "react";
import { buildService, type IServices } from "../services";

export const ServiceContext = React.createContext<IServices>({} as IServices);

interface IProps {
  children: React.ReactNode;
}

export const ServiceProvider: React.FC<IProps> = ({ children }) => {
  const services = buildService();

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
