import React from "react";
import Button from "../../../shared/components/ui/Button";

const LessonItem = ({ lesson, onView }) => {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">
          {lesson.name}
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-gray-600 font-medium">Teachers:</p>
            <p className="text-gray-800">{lesson.teachers.join(", ")}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Students:</p>
            <p className="text-gray-800 font-semibold">
              {lesson.students.length} enrolled
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Room:</p>
            <p className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
              {lesson.room}
            </p>
          </div>
        </div>
      </div>
      <Button
        onClick={() => onView(lesson.id)}
        variant="outlined"
        className="w-full"
      >
        View Details
      </Button>
    </div>
  );
};

export default LessonItem;
