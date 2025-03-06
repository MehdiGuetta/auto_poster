import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toggleDarkMode } from "../../redux/themeSlice";

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Apply dark mode class to document
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <header className="sticky  top-0 z-10 border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus:outline-none"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus:outline-none"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus:outline-none"
              aria-label="Log out"
            >
              <LogOut onClick={() => dispatch(logout())} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
