import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Button, IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import markerImg from "../../../../../public/Img/marker.png";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

interface Props {
  route: {
    start: { lat: number; lon: number; locationName: any };
    end: { lat: number; lon: number; locationName: any };
  } | null;
}

const containerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 28.507195645433153,
  lng: 77.40187084541692,
};

const GoogleMapComponent: React.FC<Props> = ({ route }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [infoWindowStartOpen, setInfoWindowStartOpen] = useState(false);
  const [infoWindowEndOpen, setInfoWindowEndOpen] = useState(false);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    setDirections(null);
  }, []);

  const recenterMap = () => {
    if (map && route) {
      const startCenter = new window.google.maps.LatLng(
        route.start.lat,
        route.start.lon
      );
      map.setCenter(startCenter);
    }
  };

  const handleDirectionsClick = () => {
    if (route) {
      const start = `${route.start.lat},${route.start.lon}`;
      const end = `${route.end.lat},${route.end.lon}`;
      window.open(`https://www.google.com/maps/dir/${start}/${end}`, "_blank");
    }
  };

  useEffect(() => {
    if (map && route) {
      const directionsService = new window.google.maps.DirectionsService();
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
            setDirections(result);
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(
              new window.google.maps.LatLng(route.start.lat, route.start.lon)
            );
            bounds.extend(
              new window.google.maps.LatLng(route.end.lat, route.end.lon)
            );
            map.fitBounds(bounds);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [map, route]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14}
        mapTypeId="hybrid"
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {route && (
          <>
            {/* Start Marker */}
            <Marker
              position={{ lat: route.start.lat, lng: route.start.lon }}
              onClick={() => setInfoWindowStartOpen(true)}
            />
            {infoWindowStartOpen && (
              <InfoWindow
                position={{ lat: route.start.lat, lng: route.start.lon }}
                onCloseClick={() => setInfoWindowStartOpen(false)}
              >
                <div>{route.start.locationName}</div>
              </InfoWindow>
            )}

            {/* End Marker */}
            <Marker
              position={{ lat: route.end.lat, lng: route.end.lon }}
              icon={{
                url: markerImg.src,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => setInfoWindowEndOpen(true)}
            />
            {infoWindowEndOpen && (
              <InfoWindow
                position={{ lat: route.end.lat, lng: route.end.lon }}
                onCloseClick={() => setInfoWindowEndOpen(false)}
              >
                <div>{route.end.locationName}</div>
              </InfoWindow>
            )}
          </>
        )}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#0000FF",
                strokeWeight: 6,
                strokeOpacity: 0.8,
              },
              markerOptions: {
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#0000FF",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#FFFFFF",
                },
              },
            }}
          />
        )}
      </GoogleMap>
      <IconButton
        onClick={recenterMap}
        style={{
          position: "absolute",
          top: "60px",
          right: "8px",
          padding: 0,
          height: "40px",
          width: "41px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <MyLocationIcon fontSize="small" />
      </IconButton>
      <Button
        onClick={handleDirectionsClick}
        style={{
          position: "absolute",
          bottom: "30px",
          left: "10px",
          padding: "10px 20px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        View in Google Maps
      </Button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(GoogleMapComponent);
