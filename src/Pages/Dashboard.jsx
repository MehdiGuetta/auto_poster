import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "../components/Layout/AppSidebar";
import Header from "../components/Layout/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <AppSidebar sidebarOpen={sidebarOpen} />

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        {/* Top bar */}
        <Header
          darkMode={darkMode}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
