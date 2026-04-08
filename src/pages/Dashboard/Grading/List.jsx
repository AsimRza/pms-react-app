import React from "react";
import Button from "../../../shared/components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServices, useUser } from "../../../providers/hooks";
import Loading from "../../../shared/components/ui/Loading";
import Error from "../../../shared/components/ui/Error";
import { toast } from "react-toastify";

const GradingList = () => {
  const { studentService } = useServices();

  const { firstName, lastName } = useUser();

  const teacherName = `${firstName} ${lastName}`;

  const query = useQuery({
    queryKey: ["getGrading"],
    queryFn: () => studentService.getGrading(),
  });

  const { mutate: deleteGrade, isPending } = useMutation({
    mutationFn: (id) => studentService.deleteGrading(id),
    onSuccess: () => {
      query.refetch();
    },
    onError: (error) => {
      toast.error(
        "Qiymetlendirme silerken bir xeta bash verdi: " + error.message,
      );
    },
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <Error message={query.error.message} />;
  }

  if (query.data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Heç bir qiymetlendirme tapilmadi
      </div>
    );
  }

  const handleDelete = (id) => {
    deleteGrade(id);
  };

  return (
    <table className="w-full border-collapse bg-white rounded-md overflow-hidden">
      <thead className="text-left!">
        <tr>
          <th className="p-2">Student Name</th>
          <th className="p-2">Lesson</th>
          <th className="p-2">Grade</th>
          <th className="p-2">Teacher</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {query.data.map((grading) => (
          <tr key={grading.id} className="border border-gray-200 h-20">
            <td className="p-2">{grading.student}</td>
            <td className="p-2">{grading.lesson}</td>
            <td className="p-2">{grading.grade}</td>
            <td className="p-2">{grading.teacher}</td>
            {grading.teacher === teacherName ? (
              <td className="p-2">
                <Button>Edit</Button>
                <Button
                  color="red"
                  className="ml-4"
                  disabled={isPending}
                  onClick={() => handleDelete(grading.id)}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </td>
            ) : (
              <td className="p-2">No permission</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradingList;
