import express from "express";
import { TEACHERS } from "../data/student.js";
import { D_GRADING_LIST } from "./students.router.js";

const router = express.Router();

router.get("/", (req, res) => {
  setTimeout(() => {
    let grades = [];

    for (let teacher of TEACHERS) {
      const teacherGrades = D_GRADING_LIST.filter(
        (g) => g.teacher === teacher.fullName,
      );

      const averageGrade =
        teacherGrades.reduce((acc, curr) => acc + curr.grade, 0) /
        teacherGrades.length;

      grades.push({
        teacher: teacher.fullName,
        averageGrade: averageGrade.toFixed(2),
      });
    }

    res.json({
      teacherAverageGrades: grades,
    });
  }, 2000);
});

export default router;
