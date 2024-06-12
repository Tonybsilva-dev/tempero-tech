import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import ReservationItem from "./_components/reversation-item";
import NotFoundReservations from "./_components/not-found-reservations";

const MyReservationsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const userReservations = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      reservation: {
        include: {
          restaurant: true,
        },
      },
    },
  });

  return (
    <>
      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="products"
      >
        <div className="container mx-auto">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Minhas reservas
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {userReservations?.reservation.map((reservation) => (
              <ReservationItem reservation={reservation} key={reservation.id} />
            ))}
          </div>
          {userReservations?.reservation.length === 0 && (
            <NotFoundReservations />
          )}
        </div>
      </section>
    </>
  );
};

export default MyReservationsPage;
