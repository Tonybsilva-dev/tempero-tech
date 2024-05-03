import Image from "next/image";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      className="group flex flex-col items-center gap-2 rounded-lg bg-transparent px-4 py-3 text-sm font-medium transition-colors hover:bg-white focus:bg-gray-100 focus:outline-none dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
      href={`/categories/${category.id}/products`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 group-hover:bg-yellow-600 group-focus:bg-[#FCD34D] dark:bg-[#292524] dark:group-hover:bg-[#57534E] dark:group-focus:bg-[#57534E]">
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={36}
          width={36}
        />
      </div>
      <span>{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
