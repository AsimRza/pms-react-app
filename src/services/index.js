import { AuthService } from "./auth";
import httpClient from "./httpClient";
import { UserService } from "./userService";

export const buildService = () => {
  let authService = new AuthService(httpClient);
  let userService = new UserService(httpClient);

  return {
    authService,
    userService,
  };
};
