import React from "react";
import { ServiceContext } from "./ServiceProvider";
import { UserContext } from "./UserProvider";

export const useServices = () => React.useContext(ServiceContext);

export const useUser = () => React.useContext(UserContext);
