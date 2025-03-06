import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  Codesandbox,
  FileText,
  LogOut,
  Settings,
  Shield,
  UserCircle,
  Users,
  Eye,
  Newspaper
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

// Replace the imported icons with Lucide icons for consistency
const links = [
  {
    label: "Pages",
    path: "/dashboard/pages",
    icon: <FileText size={18} />,
  },
  {
    label: "Groups",
    path: "/dashboard/groups",
    icon: <Users size={18} />,
  },
  {
    label: "Articles",
    path: "/dashboard/articles",
    icon: <Newspaper size={18} />,
  },
  {
    label: "Pages Spy",
    path: "/dashboard/pages-spy",
    icon: <Eye size={18} />,
  },
  {
    label: "Page Checker",
    path: "/dashboard/page-checker",
    icon: <Shield size={18} />,
  },
];

export default function AppSidebar({ sidebarOpen }) {
  const pathname = window.location.pathname;
  const [activeLink, setActiveLink] = useState(pathname);
  const [profileOpen, setProfileOpen] = useState(false);
  const userRedux = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Mock user data - replace with your actual user data
  const user = {
    name: userRedux.name,
    email: userRedux.email,
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto border-r bg-background">
        <div className="flex flex-col gap-6 p-4">
          {/* Logo and App Name */}
          <div className="flex items-center gap-3 px-2">
            <Codesandbox className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Application</span>
          </div>

          {/* Main Navigation */}
          <nav>
            <ul className="space-y-1.5">
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    onClick={() => setActiveLink(link.path)}
                    className={({ isActive }) => `
                      flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-black transition-colors duration-200
                      ${
                        isActive || activeLink === link.path
                          ? "bg-primary text-white hover:bg-primary/95 dark:hover:bg-primary/95 hover:text-white transition-colors duration-200"
                          : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      }
                    `}
                  >
                    <span className="flex h-5 w-5 items-center justify-center">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Section with Profile and Settings */}
        <div className="border-t p-4 ">
          <ul className="space-y-1.5 ">
            {/* Settings Link */}
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => `
                  flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-black transition-colors duration-200
                  ${
                    isActive || activeLink === "/dashboard/settings"
                      ? "bg-primary text-white hover:bg-primary/95 dark:hover:bg-primary/95 transition-colors duration-200"
                      : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  }
                `}
                onClick={() => setActiveLink("/dashboard/settings")}
              >
                <Settings size={18} />
                <span>Settings</span>
              </NavLink>
            </li>

            {/* Profile Section */}
            <li className="mt-3 ">
              <Collapsible
                open={profileOpen}
                onOpenChange={setProfileOpen}
                className="w-full rounded-md border bg-card "
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-left bg-white dark:bg-[#1c1c1d] focus:outline-none ">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-1 p-2 ">
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) => `
                      flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-black transition-colors duration-100
                      ${
                        isActive || activeLink === "/dashboard/settings"
                          ? "bg-primary text-white hover:bg-primary/95 dark:hover:bg-primary/95 transition-colors duration-200"
                          : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      }
                    `}
                      onClick={() => setActiveLink("/dashboard/profile")}
                    >
                      <UserCircle size={16} />
                      <span>View Profile</span>
                    </NavLink>
                    <button
                      className="flex w-full bg-background items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700 hover:text-red-500 hover:text-foreground focus:outline-none focus:ring-0 transition-colors duration-200"
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
