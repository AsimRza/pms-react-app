const FIRST_NAMES = [
  "Mirxeyal",
  "Aylin",
  "Murad",
  "Lale",
  "Ramil",
  "Nigar",
  "Elvin",
  "Aysel",
  "Orxan",
  "Gunel",
];

const LAST_NAMES = [
  "Hemidov",
  "Memmedov",
  "Aliyev",
  "Hesenov",
  "Quliyev",
  "Ismayilov",
  "Asgerov",
  "Ibrahimov",
  "Necefov",
  "Rehimov",
];

export const TEACHERS = [
  {
    fullName: "Farid Ahmadov",
    department: "Computer Science",
    email: "farid.ahmadov@pms.edu.az",
  },
  {
    fullName: "Sona Karimova",
    department: "Applied Mathematics",
    email: "sona.karimova@pms.edu.az",
  },
  {
    fullName: "Emin Guliyev",
    department: "Information Systems",
    email: "emin.guliyev@pms.edu.az",
  },
  {
    fullName: "Nermin Rzayeva",
    department: "Software Engineering",
    email: "nermin.rzayeva@pms.edu.az",
  },
];

const LESSON_POOL = [
  "Algorithms",
  "Database Systems",
  "Web Programming",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Statistics",
  "Linear Algebra",
];

const SCHEDULE_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const LESSON_TIMES = ["09:00", "11:00", "13:00", "15:00"];

const buildLessons = (studentIndex) =>
  Array.from({ length: 4 }, (_, lessonIndex) => {
    const lessonName =
      LESSON_POOL[(studentIndex + lessonIndex) % LESSON_POOL.length];
    const grade = 51 + ((studentIndex * 7 + lessonIndex * 11) % 50);

    return {
      name: lessonName,
      grade,
    };
  });

const buildSchedule = (studentIndex, lessons) =>
  lessons.map((lesson, lessonIndex) => ({
    lesson: lesson.name,
    day: SCHEDULE_DAYS[(studentIndex + lessonIndex) % SCHEDULE_DAYS.length],
    time: LESSON_TIMES[lessonIndex % LESSON_TIMES.length],
    room: `B-${101 + ((studentIndex + lessonIndex) % 25)}`,
  }));

export const D_STUDENT_LIST = Array.from({ length: 500 }, (_, index) => {
  const lessons = buildLessons(index);

  return {
    id: String(index + 1),
    firstName: FIRST_NAMES[index % FIRST_NAMES.length],
    lastName:
      LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length],
    GPA: Number((2 + (index % 21) * 0.1).toFixed(1)),
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/051/688/995/small/smiling-young-male-university-student-standing-isolate-on-transparency-background-png.png",
    teacher: TEACHERS[index % TEACHERS.length],
    lessons,
    contact: {
      email: `student${index + 1}@pms.edu.az`,
      phone: `+99450${String(1000000 + index).slice(1)}`,
      emergencyPhone: `+99455${String(2000000 + index).slice(1)}`,
      address: `Baku, Yasamal district, ${10 + (index % 40)}th street`,
    },
    schedule: buildSchedule(index, lessons),
    studentInfo: {
      admissionScore: 300 + ((index * 9) % 401),
      paymentType: index % 3 === 0 ? "paid" : "unpaid",
      faculty: "Information Technologies",
      courseYear: (index % 4) + 1,
      studentCode: `PMS-${String(index + 1).padStart(4, "0")}`,
    },
  };
});
