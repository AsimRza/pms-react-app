import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../../providers/hooks";
import Loading from "../../../shared/components/ui/Loading";
import Error from "../../../shared/components/ui/Error";

const StudentDetails = () => {
  const { id } = useParams();

  const { studentService } = useServices();
  const studentQuery = useQuery({
    queryKey: ["student", id],
    queryFn: () => studentService.getById(id),
  });

  if (studentQuery.isLoading) {
    return <Loading />;
  }

  if (studentQuery.isError) {
    return <Error message={studentQuery.error.message} />;
  }

  const student = studentQuery.data;

  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={student.image}
            alt={`${student.firstName} ${student.lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-sm text-gray-600">Student ID: {student.id}</p>
            <p className="text-sm text-gray-600">GPA: {student.GPA}</p>
            <p className="text-sm text-gray-600">
              Code: {student.studentInfo.studentCode}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded-md p-4 bg-white">
          <h3 className="text-lg font-semibold mb-3">Teacher</h3>
          <p className="text-sm text-gray-700">
            Name: {student.teacher.fullName}
          </p>
          <p className="text-sm text-gray-700">
            Department: {student.teacher.department}
          </p>
          <p className="text-sm text-gray-700">
            Email: {student.teacher.email}
          </p>
        </div>

        <div className="border rounded-md p-4 bg-white">
          <h3 className="text-lg font-semibold mb-3">Student Info</h3>
          <p className="text-sm text-gray-700">
            Admission Score: {student.studentInfo.admissionScore}
          </p>
          <p className="text-sm text-gray-700">
            Payment Type: {student.studentInfo.paymentType}
          </p>
          <p className="text-sm text-gray-700">
            Faculty: {student.studentInfo.faculty}
          </p>
          <p className="text-sm text-gray-700">
            Course Year: {student.studentInfo.courseYear}
          </p>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-lg font-semibold mb-3">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p className="text-sm text-gray-700">
            Email: {student.contact.email}
          </p>
          <p className="text-sm text-gray-700">
            Phone: {student.contact.phone}
          </p>
          <p className="text-sm text-gray-700">
            Emergency: {student.contact.emergencyPhone}
          </p>
          <p className="text-sm text-gray-700">
            Address: {student.contact.address}
          </p>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-lg font-semibold mb-3">Lessons & Grades</h3>
        <div className="space-y-2">
          {student.lessons.map((lesson) => (
            <div
              key={lesson.name}
              className="flex items-center justify-between border rounded-md px-3 py-2"
            >
              <span className="text-sm font-medium">{lesson.name}</span>
              <span className="text-sm text-gray-700">
                Grade: {lesson.grade}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-lg font-semibold mb-3">Schedule</h3>
        <div className="space-y-2">
          {student.schedule.map((item) => (
            <div
              key={`${item.lesson}-${item.day}-${item.time}`}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 border rounded-md px-3 py-2"
            >
              <p className="text-sm text-gray-700">{item.lesson}</p>
              <p className="text-sm text-gray-700">{item.day}</p>
              <p className="text-sm text-gray-700">{item.time}</p>
              <p className="text-sm text-gray-700">Room: {item.room}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
