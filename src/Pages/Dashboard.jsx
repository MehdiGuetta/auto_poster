import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import { useEffect } from "react";
// import { useSelector } from "react-redux";

const Layout = () => {
  // const userData = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  // console.log(userData);
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gray-50 dark:bg-gray-900 dark:text-white`}
    >
      {/* Sidebar */}
      <AppSidebar sidebarOpen={sidebarOpen} />

      {/* Main content */}
      <div
        className={`p-4 ${
          sidebarOpen ? "ml-64" : ""
        } transition-all duration-300 dark:bg-gray-900 dark:text-white`}
      >
        {/* Top bar */}
        <div className="mb-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
              
          </div>
        </div>
        {/* Page content */}
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
