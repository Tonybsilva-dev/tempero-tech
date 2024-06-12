"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import LocationButton from "./get-location";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <div className="flex flex-1 justify-center gap-1">
      <form className="relative max-w-md flex-1" onSubmit={handleSearchSubmit}>
        <Input
          type="search"
          placeholder="Buscar restaurantes..."
          className="h-10 w-full rounded-md border border-gray-200 bg-gray-100 pl-10 text-sm focus:border-primary focus:ring-primary dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50"
          onChange={handleChange}
          value={search}
        />
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </form>
      <LocationButton />
    </div>
  );
};

export default Search;
