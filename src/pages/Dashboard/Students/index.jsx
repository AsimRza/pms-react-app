import React from "react";
import StudentList from "./List";
import { StudentFilter } from "./StudentFIlter";

const Students = () => {
  const [filter, setFilter] = React.useState({
    name: "",
  });

  const [sorting, setSorting] = React.useState(null);
  const [limit, setLimit] = React.useState(12);

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
