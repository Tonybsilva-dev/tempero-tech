import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/src/shared/modules/utils/auth";

const OrderItem = dynamic(() => import("../components/order-item"));
const NotFoundOrders = dynamic(() => import("../components/not-found-orders"));

import { getMyOrders } from "../../_actions/my-orders";

export const MyOrdersInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const orders = await getMyOrders(String(session?.user.id));

  return (
    <main>
      <section
        className="px-6 py-16 md:px-6 lg:px-8"
        aria-labelledby="my-orders-heading"
      >
        <div className="container mx-auto">
          <h1 className="mb-1 text-3xl font-bold">Meus pedidos</h1>
          <p className="mb-8 flex items-center justify-between text-lg">
            <span>Visualize aqui seus pedidos.</span>
          </p>
          {orders.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <li key={order.id}>
                  <OrderItem order={order} />
                </li>
              ))}
            </ul>
          ) : (
            <NotFoundOrders />
          )}
        </div>
      </section>
    </main>
  );
};
