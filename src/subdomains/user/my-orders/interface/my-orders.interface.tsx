import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/src/shared/modules/utils/auth";

const OrderItem = dynamic(() => import("../components/order-item"));
const NotFoundOrders = dynamic(
  () => import("../components/not-found-orders"),
);

import { getMyOrders } from "../../_actions/my-orders";

export const MyOrdersInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const orders = await getMyOrders(String(session?.user.id));

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
            {orders.length > 0 &&
              orders.map((order) => <OrderItem key={order.id} order={order} />)}
          </div>
          {orders.length === 0 && <NotFoundOrders />}
        </div>
      </section>
    </>
  );
};
