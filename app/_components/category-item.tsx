import Image from "next/image";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 transition-shadow duration-200 ease-in-out hover:shadow-lg"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={24}
        width={24}
      />
      <span className="truncate text-sm font-medium">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
