import About from "./Pages/About";
import Contact from "./Pages/Contact";
import DepartmentDetails from "./Pages/DepartmentDetails";
import Home from "./Pages/Home";
import ProgramDetails from "./Pages/ProgramDetails";
import StudentCorner from "./Pages/StudentCorner";

const authProtectedRoutes = [

];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/about", component: <About /> },
  { path: "/program/:id", component: <ProgramDetails /> },
  { path: "/departments/:id", component: <DepartmentDetails/>},
  { path: "/student-corner", component: <StudentCorner />},
  { path: "/contact", component: <Contact /> },
  { path: "/404", component: <div>404</div> },
];

export { authProtectedRoutes, publicRoutes };
