import React, { useEffect, useState } from "react";
import { Grid, Typography, Stack } from "@mui/material";
import Googlemap from "@/app/(components)/mui-components/Google_map/GoogleMapComponentTimeline";
import useCurrentLocation from "@/app/(libs)/useCurrentLocation";
import TextMobileStepper from "./textMobileStepper";
import moment from "moment";
interface DataItem {
  currentValue: { lat: number; lon: number };
  placeName: string;
}
interface Props {
  data: any;
}

const Timeline: React.FC<Props> = ({ data }) => {
  const [timeLineLoc, setTimeLineLoc] = useState<any>();

  if (!data || data?.filteredLocations?.length === 0 || !location) {
    return (
      <Grid container mt={4} justifyContent={"center"}>
        <Typography variant="h4"> No data found</Typography>
      </Grid>
    );
  }
  const waypoints = data.filteredLocations.slice(1, -1).map((item: any) => ({
    location: new google.maps.LatLng(
      item?.currentValue?.lat,
      item?.currentValue?.lon
    ),
  }));

  const route = {
    start: {
      lat: data?.filteredLocations[0]?.currentValue?.lat,
      lon: data?.filteredLocations[0]?.currentValue.lon,
      place: data?.filteredLocations[0]?.placeName,
    },
    end: {
      lat: data?.filteredLocations[data?.filteredLocations?.length - 1]
        .currentValue.lat,
      lon: data?.filteredLocations[data.filteredLocations?.length - 1]
        ?.currentValue?.lon,
      place:
        data?.filteredLocations[data?.filteredLocations?.length - 1]?.placeName,
    },
    waypoints,
  };
  return (
    <Grid container mt={3} gap={2}>
      <Grid item xs={12} md={8}>
        {route ? (
          <Googlemap route={route} timeLineLoc={timeLineLoc} />
        ) : (
          "Nodsd"
        )}
      </Grid>
      <Grid item md={3.8}>
        <Stack sx={{ width: "100%", bgcolor: "#6D6ED1" }}>
          <TextMobileStepper
            steps={data?.filteredLocations?.map((item: any) => ({
              label: item?.placeName,
              description: `lat: ${item?.currentValue?.lat}, lon: ${item?.currentValue?.lon}`,
              timeLineLat: {
                lat: item?.currentValue?.lat,
                lon: item?.currentValue?.lon,
              },
              timeStamp: moment(item?.createdAt).format("lll"),
            }))}
            setTimeLineLoc={setTimeLineLoc}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Timeline;
