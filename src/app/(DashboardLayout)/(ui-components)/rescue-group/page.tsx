"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Tooltip,
  Button,
} from "@mui/material";
import Tabs from "@/app/(components)/mui-components/Tabs/CustomTab";
import axiosInstance from "@/app/api/axiosInstance";
import Location from "./location";
import Navigate from "./navigate";
import Timeline from "./timeline";
import SOSHistory from "./SOSHistory";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useQueryParams } from "./useQueryParams";
import { BsBatteryCharging } from "react-icons/bs";
import RippleComponent from "@/app/(components)/Ripple";
import { PiBatteryEmptyFill } from "react-icons/pi";
import { GiCarBattery } from "react-icons/gi";
import moment from "moment";

interface TabData {
  label: string;
}

const tabs: TabData[] = [
  { label: "location" },
  { label: "SOS History" },
  { label: "Navigation" },
  { label: "Timeline" },
];
type GetDataHandler = (state: any, resultArray: any) => void;
const Page = () => {
  const queryParams = useQueryParams();
  const [value, setTabValue] = useState<number>(0);
  const [valueTimeline, setTabValueTimeline] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [location, setLocation] = useState<any>(null);
  const [active, setActive] = useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<any>(moment());
  const [endDate, setEndDate] = React.useState<any>(moment());
  const { token, id } = queryParams || {};
  const handleChangeTimeline = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabValueTimeline(newValue);
  };
  const getDataFromChildHandler: GetDataHandler = (state, resultArray) => {
    const startDate = moment(state?.[0]?.startDate);
    const endDate = moment(state?.[0]?.endDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const getLocationData = async () => {
    setLoading(true);
    setLocation(null);
    setActive(false);
    try {
      const res = await axiosInstance.get(
        `api/device/get-timeline-location/${id}?locType=${valueTimeline}&startDate=${date?.format(
          "YYYY-MM-DD"
        )}&endDate=${date?.format("YYYY-MM-DD")}&token=${token}`
      );
      if (res?.status === 200 || res?.status === 201) {
        setLocation(res?.data?.data);
        setActive(true);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching location data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryParams && queryParams.token && queryParams.id) {
      getLocationData();
    }
  }, [queryParams, date, value, valueTimeline]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // console.log("data", location?.device?.lastDeviceData);
  const TabPanelList = [
    {
      component: <Location data={location} />,
    },
    {
      component: (
        <SOSHistory id={id} date1={location?.device?.lastDeviceData} />
      ),
    },
    {
      component: <Navigate data={location} />,
    },
    {
      component: (
        <Timeline
          data={location}
          handleChange={handleChangeTimeline}
          valueTimeline={valueTimeline}
        />
      ),
    },
  ];
  const getBatteryStatus = (batterySoc: any) => {
    if (batterySoc === undefined || batterySoc === null) {
      return { color: "#B0B0B0", percent: "No data" };
    }
    if (batterySoc <= 50) {
      return { color: "#FF0000", percent: `${batterySoc}%` };
    } else if (batterySoc > 50 && batterySoc < 90) {
      return { color: "#FFC300", percent: `${batterySoc}%` };
    } else {
      return { color: "#347D00", percent: "100%" };
    }
  };
  const batteryInfo = getBatteryStatus(location?.device?.battery);
  return (
    <>
      <Grid style={{ padding: "12px 15px", position: "relative" }}>
        <RippleComponent
          location={location}
          getLocationData={getLocationData}
        />
        {loading ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "100vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {active ? (
              <>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  mb={1}
                >
                  <Grid item>
                    <Typography component={"h4"} variant="h4" color="grey">
                      Device Name : {location?.device?.deviceName}
                    </Typography>
                    {location?.device?.chargingStatus === 0 ? (
                      <Grid container alignItems={"center"}>
                        Battery :
                        <Tooltip title={batteryInfo.percent}>
                          <Button
                            size="small"
                            sx={{ color: batteryInfo.color, ml: 1 }}
                            startIcon={
                              <GiCarBattery color={batteryInfo.color} />
                            }
                          >
                            {batteryInfo?.percent}
                          </Button>
                        </Tooltip>
                      </Grid>
                    ) : (
                      <Grid container alignItems={"center"}>
                        <Typography component={"h6"} variant="h6" mr={1}>
                          Charging :
                        </Typography>
                        <BsBatteryCharging size={"25px"} />
                      </Grid>
                    )}
                    {/* <Typography component={"h6"} variant="h6">
                      Charging status : {location?.device?.chargingStatus}{" "}
                      <BsBatteryCharging />
                    </Typography> */}
                  </Grid>
                  <Grid item className="datePicker">
                    {value === 3 && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Select date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  </Grid>
                </Grid>
                <Tabs
                  value={value}
                  handleChange={handleChange}
                  tabs={tabs}
                  TabPanelList={TabPanelList}
                />
              </>
            ) : (
              <Grid container justifyContent={"center"}>
                <Typography variant="h4"> 🚫 Rescue link expired</Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Page;
