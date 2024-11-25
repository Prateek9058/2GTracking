import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import { IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
interface Props {
  route: {
    start: { lat: number; lon: number; place: string };
    end: { lat: number; lon: number; place: string };
    waypoints: { location: google.maps.LatLng; stopover: boolean }[];
  } | null;
  timeLineLoc?: { lat: number; lon: number };
}

const containerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 28.507195645433153,
  lng: 77.40187084541692,
};

const GoogleMapComponentTimeline: React.FC<Props> = ({
  route,
  timeLineLoc,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [activeMarker, setActiveMarker] = useState<"start" | "end" | null>(
    null
  );

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    setDirections(null);
  }, []);

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
          waypoints: route.waypoints,
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
            result?.routes[0].overview_path.forEach((path: any) => {
              bounds.extend(path);
            });
            map.fitBounds(bounds);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [map, route]);

  useEffect(() => {
    if (map && timeLineLoc) {
      const timelineCenter = new window.google.maps.LatLng(
        timeLineLoc.lat,
        timeLineLoc.lon
      );
      map.setCenter(timelineCenter);
      map.setZoom(14);
    }
  }, [map, timeLineLoc]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  const customIcon = (color: string) => ({
    path: "M12 2C8.13 2 5 5.13 5 9c0 4.75 5.56 11.74 6.06 12.34.22.27.66.27.88 0 .5-.6 6.06-7.59 6.06-12.34 0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z",
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 2,
  });

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
        {timeLineLoc && (
          <Marker
            position={{ lat: timeLineLoc.lat, lng: timeLineLoc.lon }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "red",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#FFFFFF",
            }}
          />
        )}
        {route && (
          <>
            <Marker
              position={{ lat: route.start.lat, lng: route.start.lon }}
              icon={customIcon("green")}
              label={{
                text: "Start",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              onClick={() => setActiveMarker("start")}
            >
              {activeMarker === "start" && (
                <InfoWindow
                  position={{ lat: route.start.lat, lng: route.start.lon }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>
                    {route?.start?.place ? route?.start?.place : "start point"}
                  </div>
                </InfoWindow>
              )}
            </Marker>
            <Marker
              position={{ lat: route.end.lat, lng: route.end.lon }}
              icon={customIcon("orange")}
              label={{
                text: "End",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              onClick={() => setActiveMarker("end")}
            >
              {activeMarker === "end" && (
                <InfoWindow
                  position={{ lat: route.end.lat, lng: route.end.lon }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>
                    {route?.end?.place ? route?.end?.place : "end point"}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </>
        )}
        {directions && (
          <>
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
            <Polyline
              path={directions.routes[0].overview_path}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 2,
                    },
                    offset: "0",
                    repeat: "10px",
                  },
                ],
              }}
            />
          </>
        )}
      </GoogleMap>
      <IconButton
        onClick={() => {
          if (map && route) {
            const startCenter = new window.google.maps.LatLng(
              route.start.lat,
              route.start.lon
            );
            map.setCenter(startCenter);
          }
        }}
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
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(GoogleMapComponentTimeline);
