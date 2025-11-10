import { createContext } from "react";

const LocationContext = createContext({
  city: "Fetching...",
  coords: { lat: null, lon: null },
  setLocationData: () => {},
});

export default LocationContext;
