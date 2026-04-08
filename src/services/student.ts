import qs from "qs";
import type { IHttpClient } from "./httpClient";

interface IStudentService {
  getAllList: () => Promise<IStudent[]>;
  getList: (
    filter: IStudentListFilter,
    pageParam?: number,
    limit?: number,
  ) => Promise<{
    students: IStudent[];
    hasNextPage: boolean;
    totalCount: number;
    page: number;
  }>;
  getById: (id: number) => Promise<IStudent>;
  getGrading: () => Promise<IGrading[]>;
  deleteGrading: (id: number) => Promise<void>;
  createGrading: (data: IGradeRequest) => Promise<void>;
}

export interface IGradeRequest {
  studentId?: number;
  lessonId?: number;
  grade?: number;
  teacher: string;
}

interface IStudentListFilter {
  name?: string;
}

interface IGrading {
  id: number;
  student: string;
  lesson: string;
  teacher: string;
  grade: number;
}

interface ITeacher {
  fullName: string;
  department: string;
  email: string;
}

interface IStudentLesson {
  name: string;
  grade: number;
}

interface IStudentContact {
  email: string;
  phone: string;
  emergencyPhone: string;
  address: string;
}

interface IStudentSchedule {
  lesson: string;
  day: string;
  time: string;
  room: string;
}

interface IStudentInfo {
  admissionScore: number;
  paymentType: "paid" | "unpaid";
  faculty: string;
  courseYear: number;
  studentCode: string;
}

interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  GPA: number;
  image: string;
  teacher: ITeacher;
  lessons: IStudentLesson[];
  contact: IStudentContact;
  schedule: IStudentSchedule[];
  studentInfo: IStudentInfo;
}

export class StudentService implements IStudentService {
  httpClient: IHttpClient;
  _baseUrl = "/students";
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getList(
    filter: IStudentListFilter,
    pageParam = 1,
    limit = 12,
  ): Promise<{
    students: IStudent[];
    hasNextPage: boolean;
    totalCount: number;
    page: number;
  }> {
    const query = qs.stringify({
      q: filter?.name || undefined,
      page: pageParam,
      limit,
    });

    const { data, headers } = await this.httpClient.getWithMeta(
      `${this._baseUrl}?${query}`,
    );
    return {
      students: data as IStudent[],
      hasNextPage: headers["x-has-next-page"] === "true",
      totalCount: Number(headers["x-total-count"] || 0),
      page: pageParam,
    };
  }

  getAllList(): Promise<IStudent[]> {
    return this.httpClient.get(`${this._baseUrl}`);
  }
  getById(id: number): Promise<IStudent> {
    return this.httpClient.get(`${this._baseUrl}/${id}`);
  }
  createGrading(data: IGradeRequest): Promise<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/grading`, data);
  }
  getGrading(): Promise<IGrading[]> {
    return this.httpClient.get(`${this._baseUrl}/grading`);
  }
  deleteGrading(id: number): Promise<void> {
    return this.httpClient.delete(`${this._baseUrl}/grading/${id}`);
  }
}
