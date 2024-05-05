import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Spinner from "./spinner";

const LocationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState | null>(null);

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => setPermissionStatus(result.state));
  }, []);

  const getLocation = () => {
    setIsLoading(true);
    const worker = new Worker("/locationWorker.js");
    worker.onmessage = function (event) {
      const { street, city, error } = event.data;
      if (error) {
        console.error(error);
        return;
      }
      alert(`${city} - ${street}.`);
      setIsLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          worker.postMessage({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
          alert("Erro ao obter a localização.");
          setIsLoading(false);
        },
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsConfirmDialogOpen(false);
    getLocation();
  };

  const handleClick = () => {
    if (permissionStatus === "granted") {
      getLocation();
    } else if (permissionStatus === "prompt") {
      setIsConfirmDialogOpen(true);
    } else {
      alert("Localização não disponível, permissão foi negada.");
    }
  };

  return (
    <>
      <Button variant={"ghost"} size={"icon"} onClick={handleClick}>
        {isLoading ? <Spinner /> : <MapPin className="h-6 w-6" />}
      </Button>

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
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Compartilhar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LocationButton;
