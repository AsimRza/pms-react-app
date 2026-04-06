import express from "express";
import { D_STUDENT_LIST, TEACHERS } from "../data/student.js";
import { LESSONS_DATA } from "../data/lesson.js";

const router = express.Router();

export let D_GRADING_LIST = [
  {
    id: 1,
    student: "Aylin Hemidov",
    lesson: "Mathematics",
    grade: 12,
    teacher: TEACHERS[0].fullName,
  },
  {
    id: 11,
    student: "Famil Hemidov",
    lesson: "Mathematics",
    grade: 60,
    teacher: TEACHERS[0].fullName,
  },
  {
    id: 2,
    student: "Kənan Məhərrəmov",
    lesson: "Mathematics",
    grade: 20,
    teacher: TEACHERS[1].fullName,
  },
  {
    id: 25,
    student: "Turkan Məhərrəmova",
    lesson: "Mathematics",
    grade: 80,
    teacher: TEACHERS[1].fullName,
  },
  {
    id: 250,
    student: "Turkan2 Məhərrəmova",
    lesson: "Mathematics",
    grade: 90,
    teacher: TEACHERS[1].fullName,
  },
  {
    id: 3,
    student: "Tural Məhərrəmov",
    lesson: "Mathematics",
    grade: 30,
    teacher: TEACHERS[2].fullName,
  },
  {
    id: 4,
    student: "Əli Məhərrəmov",
    lesson: "Mathematics",
    grade: 40,
    teacher: TEACHERS[3].fullName,
  },
  {
    id: 5,
    student: "Veli Məhərrəmov",
    lesson: "Mathematics",
    grade: 60,
    teacher: TEACHERS[3].fullName,
  },
];

const SORT_FIELDS = {
  id: (student) => Number(student.id),
  firstName: (student) => student.firstName,
  lastName: (student) => student.lastName,
  GPA: (student) => student.GPA,
  admissionScore: (student) => student.studentInfo.admissionScore,
  courseYear: (student) => student.studentInfo.courseYear,
};

const compareValues = (left, right, sortOrder) => {
  if (typeof left === "string" && typeof right === "string") {
    const result = left.localeCompare(right, "az", { sensitivity: "base" });
    return sortOrder === "desc" ? -result : result;
  }

  if (left === right) {
    return 0;
  }

  const result = left > right ? 1 : -1;
  return sortOrder === "desc" ? -result : result;
};

router.get("/", (req, res) => {
  const {
    q,
    teacher,
    paymentType,
    courseYear,
    minGPA,
    maxGPA,
    sortBy = "id",
    sortOrder = "asc",
    page,
    limit,
  } = req.query;

  const normalizedSortOrder =
    String(sortOrder).toLowerCase() === "desc" ? "desc" : "asc";
  const sortFieldResolver = SORT_FIELDS[sortBy] || SORT_FIELDS.id;

  let students = [...D_STUDENT_LIST];

  if (q) {
    const search = String(q).trim().toLowerCase();
    students = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return (
        fullName.includes(search) ||
        student.contact.email.toLowerCase().includes(search) ||
        student.studentInfo.studentCode.toLowerCase().includes(search)
      );
    });
  }

  if (teacher) {
    const teacherQuery = String(teacher).trim().toLowerCase();
    students = students.filter((student) =>
      student.teacher.fullName.toLowerCase().includes(teacherQuery),
    );
  }

  if (paymentType) {
    const normalizedPaymentType = String(paymentType).trim().toLowerCase();
    students = students.filter(
      (student) =>
        student.studentInfo.paymentType.toLowerCase() === normalizedPaymentType,
    );
  }

  if (courseYear) {
    const parsedCourseYear = Number(courseYear);
    if (!Number.isNaN(parsedCourseYear)) {
      students = students.filter(
        (student) => student.studentInfo.courseYear === parsedCourseYear,
      );
    }
  }

  if (minGPA) {
    const parsedMinGPA = Number(minGPA);
    if (!Number.isNaN(parsedMinGPA)) {
      students = students.filter((student) => student.GPA >= parsedMinGPA);
    }
  }

  if (maxGPA) {
    const parsedMaxGPA = Number(maxGPA);
    if (!Number.isNaN(parsedMaxGPA)) {
      students = students.filter((student) => student.GPA <= parsedMaxGPA);
    }
  }

  students.sort((leftStudent, rightStudent) =>
    compareValues(
      sortFieldResolver(leftStudent),
      sortFieldResolver(rightStudent),
      normalizedSortOrder,
    ),
  );

  const hasPagination = page !== undefined || limit !== undefined;
  let responsePayload = students;

  if (hasPagination) {
    const parsedPage = Math.max(Number(page) || 1, 1);
    const parsedLimit = Math.max(Number(limit) || 20, 1);
    const start = (parsedPage - 1) * parsedLimit;
    const end = start + parsedLimit;

    responsePayload = students.slice(start, end);

    res.set("X-Total-Count", String(students.length));
    res.set("X-Page", String(parsedPage));
    res.set("X-Limit", String(parsedLimit));
    res.set("X-Has-Next-Page", String(end < students.length));
  }

  setTimeout(() => {
    res.json(responsePayload);
  }, 2000);
});

router.get("/grading", (req, res) => {
  setTimeout(() => {
    res.status(200).json(D_GRADING_LIST);
  }, 800);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const student = D_STUDENT_LIST.find((s) => s.id === id);
  if (student) {
    setTimeout(() => {
      res.json(student);
    }, 2000);
  } else {
    setTimeout(() => {
      res.status(404).json({ message: "Student not found" });
    }, 2000);
  }
});

router.post("/grading", (req, res) => {
  const { studentId, lessonId, grade, teacher } = req.body;

  if (!studentId || !lessonId || grade === undefined || !teacher) {
    res.status(400).json({
      message: "studentId, lessonId, grade, and teacher are required",
    });
    return;
  }

  const student = D_STUDENT_LIST.find((item) => item.id === String(studentId));
  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  const lesson = LESSONS_DATA.find((item) => item.id === Number(lessonId));
  if (!lesson) {
    res.status(404).json({ message: "Lesson not found" });
    return;
  }

  const parsedGrade = Number(grade);
  if (Number.isNaN(parsedGrade)) {
    res.status(400).json({ message: "grade must be a number" });
    return;
  }

  const gradingItem = {
    id: D_GRADING_LIST.length + 1,
    student: `${student.firstName} ${student.lastName}`,
    lesson: lesson.name,
    grade: parsedGrade,
    teacher,
  };

  D_GRADING_LIST.push(gradingItem);

  setTimeout(() => {
    res.status(201).json(gradingItem);
  }, 800);
});

router.delete("/grading/:id", (req, res) => {
  const { id } = req.params;

  setTimeout(() => {
    const parsedId = Number(id);
    D_GRADING_LIST = D_GRADING_LIST.filter(
      (grading) => grading.id !== parsedId,
    );
    res.sendStatus(204);
  }, 2000);
});

export default router;
