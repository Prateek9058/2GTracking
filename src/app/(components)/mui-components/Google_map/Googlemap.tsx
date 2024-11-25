import React, { useRef, useEffect, useState } from "react";
import markerImg from "../../../../../public/Img/marker.png";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

interface Props {
  data: { lat: number; lon: number; locationName: string } | null;
  route: {
    start: { lat: number; lon: number };
    end: { lat: number; lon: number };
  } | null;
}

const Googlemap: React.FC<Props> = ({ data, route }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapContainer.current) {
        const defaultLatLng = {
          lat: 28.507195645433153,
          lng: 77.40187084541692,
        };
        const mapInstance = new window.google.maps.Map(mapContainer.current, {
          center: {
            lat: data?.lat || defaultLatLng.lat,
            lng: data?.lon || defaultLatLng.lng,
          },
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        });
        setMap(mapInstance);
      }
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      const script = document.querySelector(
        `script[src="https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}"]`
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [data]);

  useEffect(() => {
    if (map && window.google && data) {
      const marker = new window.google.maps.Marker({
        position: {
          lat: data.lat || 28.507195645433153,
          lng: data.lon || 77.40187084541692,
        },
        map: map,
        icon: {
          url: markerImg.src,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });
      const infoWindow = new window.google.maps.InfoWindow({
        content: data.locationName || "Unknown location",
        
      });
      infoWindowRef.current = infoWindow;
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  }, [map, data]);
  useEffect(() => {
    if (map && window.google && route) {
      const directionsService = new window.google.maps.DirectionsService();
      const renderer =
        directionsRenderer || new window.google.maps.DirectionsRenderer();
      if (!directionsRenderer) {
        renderer.setMap(map);
        setDirectionsRenderer(renderer);
      }
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(
            route.start.lat,
            route.start.lon
          ),
          destination: new window.google.maps.LatLng(
            route.end.lat,
            route.end.lon
          ),
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            renderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [map, route, directionsRenderer]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default React.memo(Googlemap);
