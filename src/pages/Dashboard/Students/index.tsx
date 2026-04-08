import React from "react";
import StudentList from "./List";
import { StudentFilter } from "./StudentFIlter";

export interface IFilter {
  name: string;
}
export interface ISorting {
  name: string;
}

const Students = () => {
  const [filter, setFilter] = React.useState<IFilter>({
    name: "",
  });

  const [sorting, setSorting] = React.useState<ISorting>({
    name: "",
  });
  const [limit, setLimit] = React.useState<number>(12);

  return (
    <div>
      <StudentFilter
        filter={filter}
        setFilter={setFilter}
        sorting={sorting}
        setSorting={setSorting}
        limit={limit}
        setLimit={setLimit}
      />
      <div className="mt-10">
        <StudentList filter={filter} limit={limit} />
      </div>
    </div>
  );
};

export default Students;
