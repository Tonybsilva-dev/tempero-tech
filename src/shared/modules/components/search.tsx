"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LocationButton from "../../../subdomains/home/components/get-location";
import { Input } from "@/src/shared/_components/ui/input";

const Search = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    const searchString = e.currentTarget.value;

    if (searchString) {
      params.set("search", searchString);
    } else {
      params.delete("search");
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex flex-1 justify-center gap-1">
      <form className="relative max-w-md flex-1">
        <Input
          type="search"
          placeholder="Buscar restaurantes..."
          className="h-10 w-full rounded-md border border-gray-200 bg-gray-100 pl-10 text-sm focus:border-primary focus:ring-primary dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50"
          onChange={handleChange}
        />
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </form>
      <div className="hidden lg:block">
        <LocationButton />
      </div>
    </div>
  );
};

export default Search;
