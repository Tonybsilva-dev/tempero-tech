import React, { useState } from "react";
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
    setIsConfirmDialogOpen(true);
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
            <AlertDialogTitle>Compartilhar Localização?</AlertDialogTitle>
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
