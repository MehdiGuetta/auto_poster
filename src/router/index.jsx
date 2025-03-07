import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Pages from "../Pages/Pages";
import Groups from "../Pages/Groups";
import PagesSpy from "../Pages/PagesSpy";
import PageChecker from "../Pages/PageChecker";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoute from "../router/ProtectedRoute"; // Import the protected route

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <ProtectedRoute isProtected={false} />, // No protection for /login
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute isProtected={true} />, // Protect all Dashboard routes
    children: [
      {
        element: <Dashboard />, // Dashboard layout
        children: [
          {
            path: "/dashboard", // 🔄 Redirect "/dashboard/" to "/dashboard/pages"
            element: <Navigate to="/dashboard/pages" replace />,
          },
          {
            path: "/dashboard/pages",
            element: <Pages />,
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
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
