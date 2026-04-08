import React from "react";

interface IProps {
  title: string;
  rightPanel?: React.ReactNode;
}

export const PageHeader: React.FC<IProps> = ({ title, rightPanel }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-blue-600">{title}</h2>
      {rightPanel && <div>{rightPanel}</div>}
    </div>
  );
};
