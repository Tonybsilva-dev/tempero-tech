import dynamic from "next/dynamic";
import { db } from "@/src/shared/modules/infrastructure/database/prisma";

const CategoryItem = dynamic(() => import("../components/category-item"));

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <section className="no-scrollbar w-full py-0 md:py-0 lg:py-0">
      <div className="container flex items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
