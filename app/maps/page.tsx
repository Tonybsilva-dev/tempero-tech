import dynamic from "next/dynamic";
import Head from "next/head";
import { db } from "../_lib/prisma";
import { getDistanceFromLatLonInKm } from "../_helpers/calculate-distance";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const DynamicMap = dynamic(() => import("./_components/map"), {
  ssr: false,
});

const userCoordinates: Coordinates = {
  latitude: -7.1055274, // Example latitude
  longitude: -35.867335, // Example longitude
};

const radius = 15; // Distance in kilometers

const Map = async () => {
  const restaurants = await db.restaurant.findMany();
  const nearbyRestaurants = restaurants.filter((restaurant) => {
    if (restaurant.latitude && restaurant.longitude) {
      const distance = getDistanceFromLatLonInKm(userCoordinates, {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      });
      return distance <= radius;
    }
    return false;
  });
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
      </Head>
      <DynamicMap restaurants={nearbyRestaurants} />
    </div>
  );
};

export default Map;
