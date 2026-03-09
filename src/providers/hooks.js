import React from "react";
import { ServiceContext } from "./ServiceProvider";

export const useServices = () => React.useContext(ServiceContext);
