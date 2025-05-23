import About from "./Pages/About";
import Home from "./Pages/Home";

const authProtectedRoutes = [

];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/about", component: <About /> },
];

export { authProtectedRoutes, publicRoutes };
