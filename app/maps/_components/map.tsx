"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Restaurant } from "@prisma/client";
import { mapLogoIcon } from "@/app/_helpers/icons";
import { useSession } from "next-auth/react";
import L from "leaflet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import MapLoading from "../loading";

type MapProps = {
  restaurants: (Restaurant & {
    address?: {
      geo?: {
        lat: number;
        lng: number;
      };
    };
  })[];

  radius: number;
};

const defaultCenter: [number, number] = [-7.0997692, 35.8607108];

const Map = ({ restaurants, radius }: MapProps) => {
  const { data } = useSession();
  const [position, setPosition] = useState<[number, number]>(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState | null>(null);

  const mapUserIcon = L.icon({
    iconUrl: data?.user.image ?? "/placeholder.png",
    iconSize: [40, 40], // size of the icon
    iconAnchor: [30, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [-10, -50], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      setPermissionStatus(result.state);
      if (result.state === "granted") {
        getLocation();
      } else if (result.state === "prompt") {
        setIsConfirmDialogOpen(true);
      } else {
        setPosition(defaultCenter);
        setIsLoading(false);
      }
    });
  }, []);

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          setIsLoading(false);
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
          alert("Erro ao obter a localização.");
          setPosition(defaultCenter);
          setIsLoading(false);
        },
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
      setPosition(defaultCenter);
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsConfirmDialogOpen(false);
    getLocation();
  };

  const handleRetryPermission = () => {
    setPermissionStatus("prompt");
    setIsConfirmDialogOpen(true);
  };

  return (
    <>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja compartilhar sua localização?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Isso nos ajudará a fornecer informações relevantes com base na sua
              localização atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setPosition(defaultCenter);
                setIsLoading(false);
              }}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Compartilhar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading ? (
        <MapLoading />
      ) : permissionStatus === "denied" ? (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <p className="text-center text-gray-700">
            Acesso à localização foi negado. Por favor, tente novamente.
          </p>
          <Button onClick={handleRetryPermission}>
            Solicitar Permissão Novamente
          </Button>
        </div>
      ) : (
        <MapContainer
          center={position ?? defaultCenter}
          zoom={16}
          style={{ height: "100vh", width: "100%", zIndex: 10 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle
            center={position}
            radius={radius * 1000}
            color="yellow"
            fillColor="yellow"
            fillOpacity={0.1}
          />
          {restaurants.map((restaurant) => {
            const geo = restaurant.address?.geo;
            if (geo?.lat && geo?.lng) {
              return (
                <Marker
                  key={restaurant.id}
                  position={[geo.lat, geo.lng]}
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
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">
                          {restaurant.name}
                        </h3>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Officia quidem dicta nesciunt quas illo sit et
                          molestiae.
                        </p>
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
                    <Link href={`/restaurants/${restaurant.id}`}>
                      <Button className="w-full">Ir para restaurante</Button>
                    </Link>
                  </Popup>
                </Marker>
              );
            }
          })}
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
      )}
    </>
  );
};

export default Map;
