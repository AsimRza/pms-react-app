import type { IHttpClient } from "./httpClient";

export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  GPA: number;
  studentCode: string;
  image: string;
}

export interface ILesson {
  id: number;
  name: string;
  teachers: string[];
  students: IStudent[];
  room: string;
}

export interface ILessonService {
  getList: () => Promise<ILesson[]>;
  getById: (id: number) => Promise<ILesson>;
}

export class LessonService implements ILessonService {
  _baseUrl = "/lessons";
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  getList() {
    return this.httpClient.get<ILesson[]>(this._baseUrl);
  }

  getById(id: number) {
    return this.httpClient.get<ILesson>(`${this._baseUrl}/${id}`);
  }
}
