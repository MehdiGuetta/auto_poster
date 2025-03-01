import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import PagesSection from "../Pages/PagesSection";
import Groups from "../Pages/Groups";
import PagesSpy from "../Pages/PagesSpy";
import PageChecker from "../Pages/PageChecker";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Test from "../Test";
import SignupTest from "../SighupTest";
// import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/signup",
    element: <SignupTest />,
  },
  {
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/pages",
        element: <PagesSection />,
      },
      {
        path: "/dashboard/groups",
        element: <Groups />,
      },
      {
        path: "/dashboard/pages-spy",
        element: <PagesSpy />,
      },
      {
        path: "/dashboard/page-checker",
        element: <PageChecker />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
