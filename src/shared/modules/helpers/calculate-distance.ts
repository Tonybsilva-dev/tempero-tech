export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function getDistanceFromLatLonInKm(
  centerCoordinates: Coordinates,
  pointCoordinates: Coordinates,
): number {
  const radius = 6371; // Radius of the Earth in km
  const { latitude: lat1, longitude: lon1 } = centerCoordinates;
  const { latitude: lat2, longitude: lon2 } = pointCoordinates;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * center;

  return distance;
}
