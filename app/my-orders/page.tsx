import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";
import OrderItem from "./_components/order-item";
import { authOptions } from "../_lib/auth";
import Image from "next/image";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
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
            Meus pedidos
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.length > 0 ? (
              orders.map((order) => <OrderItem key={order.id} order={order} />)
            ) : (
              <>
              <p>Você ainda não realizou nenhum pedido.</p>
              <Image
                alt="Imagem um lugar sem pedidos"
                className="aspect-[3/3] w-full overflow-hidden rounded-lg object-cover dark:border-gray-800"
                width={800}
                height={800}
                src="/empty.svg"
              />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrdersPage;
