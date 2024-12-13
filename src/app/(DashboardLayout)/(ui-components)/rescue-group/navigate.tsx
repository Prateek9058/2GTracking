import React from "react";
import {
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from "@mui/material";
import Googlemap from "@/app/(components)/mui-components/Google_map/GoogleMapComponent";
import markerImg from "../../../../../public/Img/marker.png";
import useCurrentLocation from "@/app/(libs)/useCurrentLocation";
import Image from "next/image";

interface DataItem {
  currentValue: { lat: number; lon: number };
  placeName: string;
}
interface Props {
  data: any;
}
const Navigate: React.FC<Props> = ({ data }) => {
  const { location, error } = useCurrentLocation();

  if (!data || !location) {
    // Return null or a loading indicator if data is not yet available
    return (
      <Grid container mt={4} justifyContent={"center"}>
        <Typography variant="h4"> No data found</Typography>
      </Grid>
    );
  }

  const { lat, lon } = data?.device?.location;
  const currentLoc = data?.device?.location?.placeName;
  const currentPlaceName = location?.placeName;
  const route = {
    start: {
      lat: location?.lat,
      lon: location?.lon,
      locationName: currentPlaceName,
    },
    end: { lat, lon, locationName: currentLoc },
  };

  return (
    <Grid container mt={3}>
      <Grid item xs={12}>
        <Googlemap route={route} />
      </Grid>
      <Stack sx={{ width: "100%", mt: 3 }}>
        <Stepper activeStep={0} alternativeLabel>
          <Step>
            <StepLabel
              StepIconProps={{
                sx: {
                  "& .MuiStepIcon-text": {
                    display: "none",
                  },
                },
              }}
            >
              {" "}
              <Typography variant="h4" color="primary">
                My Location
              </Typography>
              <Typography mb={2} variant="body2" color="info">
                {currentPlaceName ? currentPlaceName : "N/A"}
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: "#00028C",
                  "& .MuiStepIcon-text": {
                    display: "none",
                  },
                },
              }}
            >
              {" "}
              <Typography variant="h4" color="primary">
                Device Location
              </Typography>
              <Typography mb={0.5} variant="body2" color="info">
                {currentLoc ? currentLoc : "N/A"}
              </Typography>
              <Typography variant="h5" color="primary">
                Type :
                {data?.device?.location?.locType === "SIM_LOC" ? "SIM" : "GPS"}
              </Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Stack>
    </Grid>
  );
};

export default Navigate;
