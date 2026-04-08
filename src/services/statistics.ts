import type { IHttpClient } from "./httpClient";

export interface IStatisticsService {
  getStatistics: () => Promise<IStatisticsResponse>;
}

interface IStatisticsResponse {
  teacherAverageGrades: ITeacherAverageGrade[];
}

interface ITeacherAverageGrade {
  teacher: string;
  averageGrade: number;
}

export class StatisticsService implements IStatisticsService {
  httpClient: IHttpClient;

  _baseUrl = "/statistics";
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  getStatistics(): Promise<IStatisticsResponse> {
    return this.httpClient.get(`${this._baseUrl}`);
  }
}
