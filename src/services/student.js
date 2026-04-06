import qs from "qs";

export class StudentService {
  _baseUrl = "/students";
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getList(filter, pageParam = 1, limit = 12) {
    const query = qs.stringify({
      q: filter?.name || undefined,
      page: pageParam,
      limit,
    });

    const { data, headers } = await this.httpClient.getWithMeta(
      `${this._baseUrl}?${query}`,
    );
    return {
      students: data,
      hasNextPage: headers["x-has-next-page"] === "true",
      totalCount: Number(headers["x-total-count"] || 0),
      page: pageParam,
    };
  }

  getAllList() {
    return this.httpClient.get(`${this._baseUrl}`);
  }
  getById(id) {
    return this.httpClient.get(`${this._baseUrl}/${id}`);
  }
  createGrading(data) {
    return this.httpClient.post(`${this._baseUrl}/grading`, data);
  }
  getGrading(data) {
    return this.httpClient.get(`${this._baseUrl}/grading`, data);
  }
  deleteGrading(id) {
    return this.httpClient.delete(`${this._baseUrl}/grading/${id}`);
  }
}
