export const parseCoordinates = (location: string): [number, number] => {
  return location.split(", ").map(Number) as [number, number];
};
