import L from "leaflet";

export const mapLogoIcon = L.icon({
  iconUrl: "/logo/logo-3.png",

  iconSize: [40, 40], // size of the icon
  iconAnchor: [30, 45], // point of the icon which will correspond to marker's location
  popupAnchor: [-10, -50], // point from which the popup should open relative to the iconAnchor
});