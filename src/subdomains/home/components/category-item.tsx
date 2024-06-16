import type { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="group relative grid overflow-hidden rounded-lg [grid-template-areas:stack]">
        <Link
          href={`/categories/${category.id}/products`}
          className="absolute inset-0 z-10"
          prefetch={false}
        >
          <span className="sr-only">{category.name}</span>
        </Link>
        <Image
          src={category.imageUrl}
          alt={category.name}
          quality={75}
          width={300}
          height={300}
          sizes="100%"
          loading="lazy"
          className="aspect-square w-full object-cover transition-opacity duration-300 [grid-area:stack]"
        />
        <div className="absolute inset-0 flex w-full items-end justify-center transition-opacity duration-300 [grid-area:stack] group-hover:opacity-100">
          <h3 className="w-full text-white bg-black bg-opacity-70 py-2 text-center text-base font-semibold tracking-tight">
            {category.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
