import dynamic from "next/dynamic";
import Head from "next/head";
import { db } from "../_lib/prisma";
import { getDistanceFromLatLonInKm } from "../_helpers/calculate-distance";
import { Restaurant } from "@prisma/client";

const DynamicMap = dynamic(() => import("./_components/map"), {
  ssr: false,
});
interface Coordinates {
  latitude: number;
  longitude: number;
}

const userCoordinates: Coordinates = {
  latitude: -7.1055274, // Example latitude
  longitude: -35.867335, // Example longitude
};


const radius = 15; // Distance in kilometers

const Map = async () => {
  const restaurants = await db.restaurant.findMany({
    include: {
      address: {
        include: {
          geo: true,
        },
      },
      categories: true,
    },
  });

  const nearbyRestaurants = restaurants.filter((restaurant) => {
    const { address } = restaurant;
    const { geo } = address ?? {};

    if (geo?.lat && geo?.lng) {
      const distance = getDistanceFromLatLonInKm(userCoordinates, {
        latitude: geo.lat,
        longitude: geo.lng,
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
      <DynamicMap
        restaurants={
          nearbyRestaurants as (Restaurant & {
            address?: {
              street: string;
              suite: string;
              city: string;
              zipcode: string;
              geo?: {
                lat: number;
                lng: number;
              };
            };
          })[]
        }
        radius={radius}
      />
    </div>
  );
};

export default Map;
