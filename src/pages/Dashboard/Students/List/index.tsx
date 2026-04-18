import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useServices } from "../../../../providers/hooks";
import Loading from "../../../../shared/components/ui/Loading";
import Error from "../../../../shared/components/ui/Error";
import Button from "../../../../shared/components/ui/Button";
import { ROUTES } from "../../../../shared/consts";
import { useNavigate } from "react-router";
import type { IFilter } from "..";

interface IProps {
  filter: IFilter;
  limit?: number;
}
const StudentList: React.FC<IProps> = ({ filter, limit = 12 }) => {
  const { studentService } = useServices();
  const navigate = useNavigate();
  const sentinelRef = useRef(null);

  const {
    data,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["students", filter, limit],
    queryFn: ({ pageParam = 1 }) =>
      studentService.getList(filter, pageParam, limit),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading dataTestId="student-list-loading" />;
  }

  if (isError) {
    return <Error message={error.message} dataTestId="student-list-error" />;
  }

  const students = data?.pages.flatMap((page) => page.students) || [];

  if (students.length === 0) {
    return (
      <div className="flex items-center justify-center p-5">
        Melumat tapilmadi!
      </div>
    );
  }

  const handleRedirect = (id: string) => {
    navigate(ROUTES.STUDENT_DETAILS.replace(":id", id));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="p-4 border rounded-md bg-white flex flex-col items-center text-center"
          >
            <img
              src={student.image}
              alt={`${student.firstName} ${student.lastName}`}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-3">GPA: {student.GPA}</p>
            <Button
              onClick={() => handleRedirect(student.id)}
              variant="outlined"
              className="w-full"
            >
              Details
            </Button>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div
          data-testid="student-list-sentinel"
          ref={sentinelRef}
          className="h-10 mt-4"
        />
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <Loading dataTestId="student-list-next-loading" />
        </div>
      )}
    </div>
  );
};

export default StudentList;
