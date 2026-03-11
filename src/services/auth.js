import httpClient from "./httpClient";

export class AuthService {
  _baseUrl = "/auth";
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  login(data) {
    return this.httpClient.post(`${this._baseUrl}/login`, data);
  }
  logout() {
    return this.httpClient.post(`${this._baseUrl}/logout`);
  }

  me() {
    return this.httpClient.get(`${this._baseUrl}/me`);
  }
}
