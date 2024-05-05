"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Image from "next/image";
import Loading from "@/app/loading";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Restaurant } from "@prisma/client";
import { mapLogoIcon } from "@/app/_helpers/icons";
import { useSession } from "next-auth/react";
import L from "leaflet";

type MapProps = {
  restaurants: Restaurant[];
};

const defaultCenter: [number, number] = [-7.0997692, 35.8607108];
const Map = ({ restaurants }: MapProps) => {
  const { data } = useSession();

  const [position, setPosition] = useState<[number, number] | null>(null);

  const mapUserIcon = L.icon({
    iconUrl: data?.user.image ?? "/placeholder.png",

    iconSize: [40, 40], // size of the icon
    iconAnchor: [30, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [-10, -50], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        setPosition(defaultCenter);
      },
    );
  }, []);

  return position === null ? (
    <Loading />
  ) : (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {restaurants.map(
        (restaurant) =>
          restaurant.latitude !== null &&
          restaurant.longitude !== null && (
            <Marker
              key={restaurant.id}
              position={[restaurant.latitude, restaurant.longitude]}
              icon={mapLogoIcon}
            >
              <Popup>
                <div className="flex w-[260px] flex-col gap-6">
                  <div className="relative h-[100px] w-full">
                    <Image
                      alt="Card Image"
                      src={restaurant.imageUrl}
                      fill
                      sizes="100%"
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="space-y-1 truncate">
                    <h3 className="truncate text-lg font-semibold">
                      {restaurant.name}
                    </h3>
                    <p>Restaurant description here</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Entrega</span>
                    <p className="text-xs font-semibold">
                      {Number(restaurant.deliveryFee) === 0
                        ? "Grátis"
                        : `R$${restaurant.deliveryFee}`}
                    </p>
                  </div>
                </div>
                <Button className="w-full">
                  <Link href={"#"}>Saiba mais</Link>
                </Button>
              </Popup>
            </Marker>
          ),
      )}
      <Marker position={position} icon={mapUserIcon}>
        <Popup>
          <div className="flex w-[260px] flex-col gap-6">
            <div className="relative h-[100px] w-full">
              <Image
                alt="Card Image"
                src={"/logo/logo-3.png"}
                fill
                sizes="100%"
                className="rounded-md object-cover"
              />
            </div>
            <div className="self-center truncate">
              <h3 className="truncate text-lg font-semibold">
                Você está aqui!
              </h3>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
