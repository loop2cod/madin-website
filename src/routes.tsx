import About from "./Pages/About";
import Home from "./Pages/Home";
import ProgramDetails from "./Pages/ProgramDetails";

const authProtectedRoutes = [

];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/about", component: <About /> },
  { path: "/program/:id", component: <ProgramDetails /> },
];

export { authProtectedRoutes, publicRoutes };
