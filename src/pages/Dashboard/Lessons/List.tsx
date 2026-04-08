import React from "react";
import LessonItem from "./LessonItem";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../../providers/hooks";
import Loading from "../../../shared/components/ui/Loading";
import Error from "../../../shared/components/ui/Error";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../shared/consts";

const LessonList = () => {
  const { lessonService } = useServices();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["getLessons"],
    queryFn: () => lessonService.getList(),
  });

  const handleViewDetails = (lessonId: number) => {
    navigate(ROUTES.LESSON_DETAILS.replace(":id", lessonId.toString()));
  };

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <Error message={query.error.message} />;
  }
  if (!query.data || query.data.length === 0) {
    return (
      <div className="text-center text-gray-500">Heç bir dərs tapılmadı</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {query.data.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          onView={handleViewDetails}
        />
      ))}
    </div>
  );
};

export default LessonList;
