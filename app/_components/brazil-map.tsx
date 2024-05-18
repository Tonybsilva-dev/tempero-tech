"use client";

import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { stateRestaurants } from "../_helpers/state-restaurants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { CalendarIcon } from "lucide-react";

const SVGComponent = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [titleState, setTitleState] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseOver = (event: MouseEvent) => {
    const target = event.target as SVGPathElement;
    if (target.tagName === "path") {
      // target.setAttribute("fill", "#FFD700");
      const stateId = target.getAttribute("id")?.replace("BR-", "") || "";
      const stateTitle = target.getAttribute("title") || "";
      setHoveredState(stateId);
      setTitleState(stateTitle);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseOut = () => {
    setHoveredState(null);
    setMousePosition(null);
  };

  const addEventListenersToPaths = (svg: SVGSVGElement) => {
    const paths = svg.querySelectorAll("path");
    paths.forEach((path) => {
      path.addEventListener("mouseover", handleMouseOver);
      path.addEventListener("mouseout", handleMouseOut);
    });
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <HoverCard open={Boolean(hoveredState)}>
        <HoverCardTrigger asChild>
          <ReactSVG
            src="/brazil.svg"
            afterInjection={(svg: SVGSVGElement) => {
              if (svg) {
                addEventListenersToPaths(svg);
              }
            }}
          />
        </HoverCardTrigger>
        {hoveredState && mousePosition && (
          <HoverCardContent
            className="pointer-events-none absolute w-80 rounded bg-gray-800 p-4 text-white shadow-lg"
            style={{
              top: `${mousePosition.y + 10}px`,
              left: `${mousePosition.x + 10}px`,
            }}
          >
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{`Estado: ${hoveredState.slice(0, 2)} - ${titleState}`}</h4>
                <p className="text-sm">{`Número de pontos cadastrados: ${stateRestaurants[hoveredState as keyof typeof stateRestaurants]}`}</p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-zinc-400">
                    Última atualização {new Date().toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};

export default SVGComponent;
