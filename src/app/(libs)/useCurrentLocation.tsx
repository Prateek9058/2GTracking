import { useState, useEffect } from "react";
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
interface Location {
  lat: number;
  lon: number;
  placeName?: string;
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaceName = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0].formatted_address;
        } else {
          throw new Error("No results found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch place name");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const placeName = await fetchPlaceName(latitude, longitude);
          setLocation({ lat: latitude, lon: longitude, placeName });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { location, error };
};

export default useCurrentLocation;
