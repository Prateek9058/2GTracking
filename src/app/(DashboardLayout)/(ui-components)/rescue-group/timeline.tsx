import React, { useEffect, useState } from "react";
import { Grid, Typography, Stack } from "@mui/material";
import Googlemap from "@/app/(components)/mui-components/Google_map/GoogleMapComponentTimeline";
import useCurrentLocation from "@/app/(libs)/useCurrentLocation";
import Tabs from "@/app/(components)/mui-components/Tabs/CustomTab";
import ESim from "./E-sim";
import TextMobileStepper from "./textMobileStepper";
import moment from "moment";
interface DataItem {
  currentValue: { lat: number; lon: number };
  placeName: string;
}
interface Props {
  data: any;
  handleChange: any;
  valueTimeline: number;
}

interface TabData {
  label: string;
}

const tabs: TabData[] = [{ label: "GPS" }, { label: "sim" }];

const Timeline: React.FC<Props> = ({ data, handleChange, valueTimeline }) => {
  const TabPanelList = [
    {
      component: <ESim data={data} />,
    },
    {
      component: <ESim data={data} />,
    },
  ];

  // if (!data || data?.filteredLocations?.length === 0 || !location) {
  //   return (
  //     <Grid container mt={4} justifyContent={"center"}>
  //       <Typography variant="h4"> No data found</Typography>
  //     </Grid>
  //   );
  // }

  return (
    <>
      <Grid mt={2}>
        <Tabs
          value={valueTimeline}
          handleChange={handleChange}
          tabs={tabs}
          TabPanelList={TabPanelList}
        />
      </Grid>
    </>
  );
};
export default Timeline;
