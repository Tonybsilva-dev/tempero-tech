import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar restaurantes" className="border" />
      <Button size="icon">
        <SearchIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Search;
