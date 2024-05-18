import { db } from "@/app/_lib/prisma";
import Scheduler from "./_components/scheduler";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const ScheduleRestaurantPage = async ({
  params: { id },
}: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      reservations: true
    }
  });

  if (!restaurant) {
    return notFound();
  }

  return <Scheduler restaurant={restaurant} />;
};

export default ScheduleRestaurantPage;
