export interface IAuthService {
  login: (data: ILoginData) => Promise<ILoginResponse>;
  logout: () => Promise<void>;
  me: () => Promise<IUser>;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}
export interface ILoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
