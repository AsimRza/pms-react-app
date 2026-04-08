import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../../providers/hooks";
import Loading from "../../../shared/components/ui/Loading";
import Error from "../../../shared/components/ui/Error";
import Button from "../../../shared/components/ui/Button";
import { ROUTES } from "../../../shared/consts";

const LessonDetails = () => {
  const { lessonService } = useServices();

  const navigate = useNavigate();

  const { id } = useParams();

  const query = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => lessonService.getById(Number(id)),
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <Error message={query.error.message} />;
  }

  const handleStudentDetails = (id: string) => {
    navigate(ROUTES.STUDENT_DETAILS.replace(":id", id));
  };

  const lesson = query.data;

  if (!lesson) {
    return <div className="text-center text-gray-500">Dərs tapılmadı</div>;
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4 bg-white">
        <h2 className="text-2xl font-bold text-blue-600">{lesson.name}</h2>
        <p className="text-sm text-gray-600 mt-1">Lesson ID: {lesson.id}</p>
        <p className="text-sm text-gray-700 mt-2">Room: {lesson.room}</p>
        <p className="text-sm text-gray-700">
          Teachers: {lesson.teachers.join(", ")}
        </p>
      </div>

      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-lg font-semibold mb-3">Students</h3>

        {lesson.students && lesson.students.length > 0 ? (
          <div className="space-y-3">
            {lesson.students.map((student) => (
              <div
                key={student.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-md p-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.image}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-gray-600">
                      Code: {student.studentCode}
                    </p>
                    <p className="text-xs text-gray-600">GPA: {student.GPA}</p>
                  </div>
                </div>

                <Button
                  variant="outlined"
                  onClick={() => handleStudentDetails(student.id)}
                >
                  Student Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            No students found for this lesson.
          </p>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;
