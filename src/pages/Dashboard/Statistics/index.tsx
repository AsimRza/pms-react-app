import { PageHeader } from "../../../shared/components/PageHeader";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../../providers/hooks";
import Loading from "../../../shared/components/ui/Loading";
import Error from "../../../shared/components/ui/Error";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Statistics = () => {
  const { statisticsService } = useServices();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getStatistics"],
    queryFn: () => {
      return statisticsService.getStatistics();
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  const teacherAverageGrades = data.teacherAverageGrades;

  const teachers = teacherAverageGrades.map((item) => item.teacher);
  const teacherGrades = teacherAverageGrades.map((item) => item.averageGrade);

  const averageTeacher = {
    labels: teachers,
    datasets: [
      {
        label: "Average Grade by Teacher",
        data: teacherGrades,

        borderWidth: 1,
      },
    ],
  };

  const averageGroup = {
    labels: ["Nurlan", "Senan"],
    datasets: [
      {
        label: "Course Year",
        data: [30, 60],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div>
      <PageHeader title="Statistics" />

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg shadow p-4">
          <Bar data={averageTeacher} options={options} />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <Bar data={averageGroup} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
