"use client";

import React from "react";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";

const LocationButton: React.FC = () => {
  return (
    <>
      <Link href={"/maps"} title="BUSCAR RESTAURANTES PROXIMOS">
        <Button variant={"ghost"} size={"icon"}>
          <MapPin className="z-50 h-6 w-6" />
        </Button>
      </Link>
    </>
  );
};

export default LocationButton;
