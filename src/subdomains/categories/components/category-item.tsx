import type { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const NewCategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="group relative grid overflow-hidden rounded-lg [grid-template-areas:stack]">
        <Link
          href={`/categories/${category.id}/products`}
          className={"absolute inset-0 z-10"}
          prefetch={false}
        >
          <span className="sr-only">View</span>
        </Link>
        <Image
          src={category.imageUrl}
          alt={category.name}
          quality={75}
          width={300}
          height={300}
          sizes="100%"
          className="aspect-square w-full object-cover [grid-area:stack]"
        />
        <div className="flex flex-1 flex-col justify-end gap-2 bg-black/70 p-4 text-white transition-opacity [grid-area:stack] group-hover:opacity-90">
          <h3 className="text-center text-base font-semibold tracking-tight">
            {category.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NewCategoryItem;
