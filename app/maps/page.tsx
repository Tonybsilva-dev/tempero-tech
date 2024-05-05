import dynamic from "next/dynamic";
import Head from "next/head";
import { db } from "../_lib/prisma";

const DynamicMap = dynamic(() => import("./_components/map"), {
  ssr: false,
});

const Map = async () => {
  const restaurants = await db.restaurant.findMany();

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
      </Head>
      <DynamicMap restaurants={restaurants} />
    </div>
  );
};

export default Map;
