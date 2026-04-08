export class StatisticsService {
  _baseUrl = "/statistics";
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getStatistics() {
    return this.httpClient.get(`${this._baseUrl}`);
  }
}
