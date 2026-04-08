import type { IAuthService, ILoginData, ILoginResponse, IUser } from "./model";
import type { IHttpClient } from "../httpClient";

export class AuthService implements IAuthService {
  _baseUrl = "/auth";
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  login(data: ILoginData) {
    return this.httpClient.post<ILoginResponse>(`${this._baseUrl}/login`, data);
  }
  logout() {
    return this.httpClient.post<void>(`${this._baseUrl}/logout`);
  }

  me() {
    return this.httpClient.get<IUser>(`${this._baseUrl}/me`);
  }
}
