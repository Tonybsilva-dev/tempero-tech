import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import ReservationItem from "./_components/reversation-item";
import Image from "next/image";

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
            <>
              <h3 className="font-medium">
                Você ainda não marcou nenhuma reserva em um restaurante.
              </h3>
              <div className="flex items-center justify-center">
                <Image
                  alt="Imagem um lugar sem pedidos"
                  className="aspect-[1/1] self-center overflow-hidden rounded-lg object-cover dark:border-gray-800"
                  width={400}
                  height={400}
                  src="/schedule.svg"
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MyReservationsPage;
