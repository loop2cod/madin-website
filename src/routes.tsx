import About from "./Pages/About";
import DepartmentDetails from "./Pages/DepartmentDetails";
import Home from "./Pages/Home";
import ProgramDetails from "./Pages/ProgramDetails";

const authProtectedRoutes = [

];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/about", component: <About /> },
  { path: "/program/:id", component: <ProgramDetails /> },
  { path: "/departments/:id", component: <DepartmentDetails/>}
];

export { authProtectedRoutes, publicRoutes };
