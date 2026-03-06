import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth";
import { DASHBOARD_ROUTES, ROUTES } from "./shared/consts";
import Landing from "./pages/Landing";
import Lessons from "./pages/Dashboard/Lessons";
import Students from "./pages/Dashboard/Students";
import Grading from "./pages/Dashboard/Grading";
import Statistics from "./pages/Dashboard/Statistics";

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />}>
          <Route path={DASHBOARD_ROUTES.LESSONS} element={<Lessons />} />
          <Route path={DASHBOARD_ROUTES.STUDENTS} element={<Students />} />
          <Route path={DASHBOARD_ROUTES.GRADING} element={<Grading />} />
          <Route path={DASHBOARD_ROUTES.STATISTICS} element={<Statistics />} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
