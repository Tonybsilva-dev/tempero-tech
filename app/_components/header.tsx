import { Button } from "./ui/button";
import { MenuIcon, Utensils } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between border-b px-5 py-6">
      <p className="flex justify-center gap-2 text-sm font-bold lg:text-xl">
        <Utensils className="h-4 w-4 lg:h-7 lg:w-7" />
        The coffee class
      </p>
      <Button
        size="icon"
        variant="outline"
        className="self-center border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
