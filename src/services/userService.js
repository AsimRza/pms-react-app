export class UserService {
  _baseUrl = "/user";
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  me() {
    return this.httpClient.post(`${this._baseUrl}/me`);
  }
}
