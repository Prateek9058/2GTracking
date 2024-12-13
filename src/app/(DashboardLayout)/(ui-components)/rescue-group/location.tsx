import React from "react";
import { Grid, Typography } from "@mui/material";
import Googlemap from "@/app/(components)/mui-components/Google_map/Googlemap";
import markerImg from "../../../../../public/Img/marker.png";
import useCurrentLocation from "@/app/(libs)/useCurrentLocation";
import Image from "next/image";
import moment from "moment";
interface Props {
  data: any;
}
const Location: React.FC<Props> = ({ data }) => {
  const { location, error } = useCurrentLocation();
  if (!data) {
    // Return null or a loading indicator if data is not yet available
    return (
      <Grid container mt={4} justifyContent={"center"}>
        <Typography variant="h4"> No data found</Typography>
      </Grid>
    );
  }
  const { lat, lon } = data?.device?.location;
  const cureentLoc = data?.device?.location?.placeName;
  return (
    <Grid container mt={3}>
      <Grid item xs={12}>
        <Googlemap data={{ lat, lon, locationName: cureentLoc }} route={null} />
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item>
          <Image src={markerImg} alt={"marker kids terack"} />
        </Grid>
        <Grid item>
          <Typography variant="h4" color="primary">
            Last updated at
          </Typography>

          <Typography mb={1} variant="body2" color="info">
            {cureentLoc ? cureentLoc : "N/A"}
          </Typography>
          <Typography variant="h5" color="primary">
            Type :
            {data?.device?.location?.locType === "SIM_LOC" ? "SIM" : "GPS"}
          </Typography>
          <Typography variant="h5" color="primary">
            date :
            {data?.device?.lastDeviceDataLocation
              ? moment(data?.device?.lastDeviceDataLocation).format("lll")
              : " --"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Location;
