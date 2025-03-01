import { useState } from "react";
import { FaPager } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiSpyFill } from "react-icons/ri";
import { TbShieldCheckeredFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { Codesandbox } from "lucide-react";

const links = [
  {
    label: "Pages",
    path: "/dashboard/pages",
    icon: <FaPager />,
  },
  {
    label: "Groups",
    path: "/dashboard/groups",
    icon: <MdGroups />,
  },
  {
    label: "Pages Spy",
    path: "/dashboard/pages-spy",
    icon: <RiSpyFill />,
  },
  {
    label: "Page Checker",
    path: "/dashboard/page-checker",
    icon: <TbShieldCheckeredFilled />,
  },
];

export default function AppSidebar({ sidebarOpen }) {
  const [activeLink, setActiveLink] = useState("/dashboard/pages"); // Set initial active link

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-900 border-r">
        <div className="flex items-center mb-5 pl-2.5">
          <Codesandbox className="h-6 w-6 text-blue-600" />
          <span className="ml-3 text-xl font-semibold">Application</span>
        </div>
        <ul className="space-y-2 font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                onClick={() => setActiveLink(link.path)} // Update active link on click
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
                  activeLink === link.path
                    ? "bg-primary text-white hover:bg-primary/95 dark:hover:bg-primary/80"
                    : ""
                }`}
              >
                <span
                  className={`w-5 h-5 ${
                    activeLink === link.path ? "text-white" : "text-gray-500"
                  }`}
                >
                  {link.icon}
                </span>
                <span className="ml-3">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
