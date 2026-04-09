import LessonList from "./List";
import { PageHeader } from "../../../shared/components/PageHeader";

const Lessons = () => {
  return (
    <>
      <PageHeader title="Lessons" />
      <LessonList />
    </>
  );
};

export default Lessons;
