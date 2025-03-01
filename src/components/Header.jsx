import { Button } from "@/components/ui/button";
import { CiMenuBurger } from "react-icons/ci";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-8 text-white bg-blue-500">
      <div className="flex justify-center items-center">
        <CiMenuBurger />
        <p className="text-2xl font-bold">Welcome back user</p>
      </div>
      <div>
        <Button className="px-5 py-4 text-xl bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-700">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Header;
