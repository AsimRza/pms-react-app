import { AuthService } from "./auth";
import httpClient from "./httpClient";
import { StudentService } from "./student";
import { UserService } from "./userService";
import { LessonService } from "./lesson";
import { StatisticsService } from "./statistics";

export const buildService = () => {
  const authService = new AuthService(httpClient);
  const userService = new UserService(httpClient);
  const studentService = new StudentService(httpClient);
  const lessonService = new LessonService(httpClient);
  const statisticsService = new StatisticsService(httpClient);

  return {
    authService,
    userService,
    studentService,
    lessonService,
    statisticsService,
  };
};

export type IServices = ReturnType<typeof buildService>;
