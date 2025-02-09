import { Earthquake } from "@/__generated__/graphql";

export interface IEarthquakeWithCoordinates extends Earthquake {
  longitude: number | null;
  latitude: number | null;
}
