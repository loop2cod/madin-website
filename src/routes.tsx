import About from "./Pages/About";
import AdmissionPage from "./Pages/AdmissionPage";
import Contact from "./Pages/Contact";
import DepartmentDetails from "./Pages/DepartmentDetails";
import Facilities from "./Pages/Facilities";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import ProgramDetails from "./Pages/ProgramDetails";
import StudentCorner from "./Pages/StudentCorner";

const authProtectedRoutes = [

];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/about", component: <About /> },
  { path: "/admission", component: <AdmissionPage /> },
  { path: "/program/:id", component: <ProgramDetails /> },
  { path: "/departments/:id", component: <DepartmentDetails/>},
  { path: "/facilities", component: <Facilities />},
  { path: "/student-corner/:tab", component: <StudentCorner />},
  { path: "/contact", component: <Contact /> },
  { path: "/gallery", component: <Gallery /> },
  { path: "/404", component: <NotFound /> }, // Keep this for direct /404 access
];

export { authProtectedRoutes, publicRoutes };
