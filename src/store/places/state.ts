import { Feature } from "@/interfaces/places";

export interface IPlacesState {
  isLoading: boolean;
  userLocation?: [number, number], // lng, lat
  isLoadingPlaces: boolean,
  places: Feature[],
}

function state(): IPlacesState {
  return {
    isLoading: true,
    userLocation: undefined,
    places: [],
    isLoadingPlaces: false,
  }
}

export default state;