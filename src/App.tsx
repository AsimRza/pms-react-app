import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth";
import { DASHBOARD_ROUTES, ROUTES } from "./shared/consts";
import Lessons from "./pages/Dashboard/Lessons";
import Students from "./pages/Dashboard/Students";
import Grading from "./pages/Dashboard/Grading";
import Statistics from "./pages/Dashboard/Statistics";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import GuestRoute from "./shared/components/GuestRoute";
import UserProvider from "./providers/UserProvider";
import StudentDetails from "./pages/Dashboard/StudentDetails";
import LessonDetails from "./pages/Dashboard/LessonDetails";

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.LANDING}
          element={
            <ProtectedRoute>
              <UserProvider>
                <Dashboard />
              </UserProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <UserProvider>
                <Dashboard />
              </UserProvider>
            </ProtectedRoute>
          }
        >
          <Route path={DASHBOARD_ROUTES.LESSONS} element={<Lessons />} />
          <Route
            path={DASHBOARD_ROUTES.LESSON_DETAILS}
            element={<LessonDetails />}
          />
          <Route path={DASHBOARD_ROUTES.STUDENTS} element={<Students />} />
          <Route
            path={DASHBOARD_ROUTES.STUDENT_DETAILS}
            element={<StudentDetails />}
          />
          <Route path={DASHBOARD_ROUTES.GRADING} element={<Grading />} />
          <Route path={DASHBOARD_ROUTES.STATISTICS} element={<Statistics />} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
};
