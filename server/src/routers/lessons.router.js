import express from "express";
import { LESSONS_DATA } from "../data/lesson.js";
import { D_STUDENT_LIST } from "../data/student.js";

const router = express.Router();

router.get("/", (req, res) => {
  setTimeout(() => {
    res.json(LESSONS_DATA);
  }, 1500);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const lesson = LESSONS_DATA.find((item) => item.id === Number(id));

  if (!lesson) {
    setTimeout(() => {
      res.status(404).json({ message: "Lesson not found" });
    }, 1500);
    return;
  }

  const students = lesson.students
    .map((studentRef) =>
      D_STUDENT_LIST.find((student) => student.id === String(studentRef.id)),
    )
    .filter(Boolean)
    .map((student) => ({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      GPA: student.GPA,
      studentCode: student.studentInfo.studentCode,
      image: student.image,
    }));

  setTimeout(() => {
    res.json({
      ...lesson,
      students,
    });
  }, 1500);
});

export default router;
