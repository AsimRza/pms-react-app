import type { IUser } from "./auth/model";
import type { IHttpClient } from "./httpClient";

interface IUserService {
  me: () => Promise<IUser>;
}

export class UserService implements IUserService {
  httpClient: IHttpClient;
  _baseUrl = "/user";
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  me(): Promise<IUser> {
    return this.httpClient.get(`${this._baseUrl}/me`);
  }
}
