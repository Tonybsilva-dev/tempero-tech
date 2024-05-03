import React, { useState } from "react";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import Spinner from "./spinner";

const LocationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(false); // Defina isLoading como falso após a conclusão da operação
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
          setIsLoading(false); // Defina isLoading como falso em caso de erro
        },
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Button variant={"ghost"} size={"icon"}>
          <Spinner />{" "}
        </Button>
      ) : (
        <Button variant={"ghost"} size={"icon"} onClick={getLocation}>
          <MapPin className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};

export default LocationButton;
