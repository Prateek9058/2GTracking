"use client";
import React, { useState, useEffect, memo } from "react";
import { Grid, Typography, Button, styled } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable";
import axiosInstance from "@/app/api/axiosInstance";
import { useParams, useSearchParams } from "next/navigation";
import moment from "moment";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";

const StyleTime = styled(TimePicker)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "0.875rem",
    height: "38px",
  },
  "& .MuiInputBase-input": {
    padding: "0 8px",
  },
  "& .MuiFormLabel-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "12px",
    fontSize: "0.875rem",
  },
  "& .MuiIconButton-root": {
    width: "35px",
    height: "35px",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
}));

type GetDataHandler = (state: any, resultArray: any) => void;
export default function Tableprofile({ id, date1 }: any) {
  const { deviceProfile } = useParams<{ deviceProfile: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<any>(10);
  const [sosHistory, setSosHistory] = useState<any>([]);
  const [date, setDate] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const searchParams1 = useSearchParams();
  const [startDate, setStartDate] = React.useState<any>(moment());
  const [endDate, setEndDate] = React.useState<any>(moment(date1));
  const [StartTime, setStartTime] = useState<any>(null);
  const [EndTime, setEndTime] = useState<any>(null);
  // const id = searchParams1.get("id");
  // console.log("id=====>", id, deviceProfile);

  const handleClickOpenMap = (location: any) => {
    setSelectedLocation(location);
    setOpen(true);
  };

  const handleStartTimeChange = (newValue: any) => {
    setStartTime(newValue);
  };
  const handleEndTimeChange = (newValue: any) => {
    setEndTime(newValue);
    console.log("Selected Time:", newValue?.format("HH:mm:ss"));
  };
  console.log("start Time:", dayjs(EndTime)?.format("HH:mm:ss"));

  const getDataFromChildHandler: GetDataHandler = (state, resultArray) => {
    const startDate = moment(state?.[0]?.startDate);
    const endDate = moment(state?.[0]?.endDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };
  console.log("id===>", id);

  const getSosHistory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `api/device/sos-history/${id}?page=${
          page + 1
        }&limit=${rowsPerPage}&startDate=${moment(startDate).format(
          "YYYY-MM-DD"
        )}&endDate=${moment(endDate).format("YYYY-MM-DD")}&startTime=${
          StartTime === null ? "" : dayjs(StartTime)?.format("HH:mm:ss")
        }&endTime=${EndTime === null ? "" : dayjs(EndTime)?.format("HH:mm:ss")}`
      );

      if (res?.status === 200 || 201) {
        setSosHistory(res?.data?.data);
        setLoading(false);
        console.log(res);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSosHistory();
  }, [page, rowsPerPage, date, startDate, endDate, StartTime, EndTime]);
  const columns = [
    "Sno.",
    "Value",
    "Date and Time",
    // "Location"
  ];
  const getFormattedData = (data: any[]) => {
    return data?.map((item, index) => ({
      sno: index + 1,

      currentValue:
        item?.type === "Location"
          ? `${
              item?.placeName
                ? item.placeName
                : `Latitude :${item?.currentValue?.lat}, Longitude:${item?.currentValue?.lon}`
            }`
          : item?.type === "Battery"
          ? `Battery: ${item?.currentValue}%`
          : item?.currentValue,

      createdAt: moment(item?.createdAt).format("lll"),
      // location:
      //   item?.type === "Location" ? (
      //     <IconButton
      //       aria-label="close"
      //       onClick={() => handleClickOpenMap(item?.currentValue)}
      //       size="small"
      //     >
      //       <ShareLocationIcon sx={{ color: "#6DA430" }} />
      //     </IconButton>
      //   ) : (
      //     ""
      //   ),
    }));
  };
  //// export csv ////
  const handleExport = (data: any) => {
    const modifiedData = data.map((row: any, index: any) => ({
      Sno: index + 1,
      SOS: row?.SOS,
      currentValue:
        row?.type === "Location"
          ? `lat:${row?.currentValue?.lat}, lon:${row?.currentValue?.lon}`
          : row?.type === "Battery"
          ? `${row?.currentValue}%`
          : row?.currentValue,
      alert: row?.alert,
      CreatedAt: moment(row?.createdAt).format("lll"),
      UpdatedAt: moment(row?.updatedAt).format("lll"),
    }));

    const csvData: (string | string[])[][] = [];
    const tableHeading = "              SOS History            ";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Sno.",
      "SOS Status",
      "Current Value",
      "Alert",
      "Created At",
      "Updated At",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row: any) => {
      const rowData = [
        row.Sno,
        row.SOS,
        row.currentValue,
        row.alert,
        row.CreatedAt,
        row.UpdatedAt,
      ];
      csvData.push(rowData);
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "SosHistoryReport.csv");
  };
  return (
    <>
      {/* <MapLocation
        open={open}
        setOpen={setOpen}
        selectedLocation={selectedLocation}
      /> */}
      <Grid container mt={3}>
        <Typography mb={2} variant="h3" color="info">
          SOS History
        </Typography>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems="center"
          p={2}
          sx={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
        >
          <Grid item>
            <Typography variant="h5">
              {" "}
              Showing {sosHistory ? sosHistory?.combinedHistory?.length : 0} out
              of {sosHistory?.count} SOS History
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justifyContent={"space-between"}>
              <Grid item mr={1}>
                <Button
                  onClick={() => handleExport(sosHistory?.combinedHistory)}
                  startIcon={<CloudDownloadIcon />}
                  variant="outlined"
                  size="large"
                  sx={{
                    border: "0.1px solid #6DA430",
                    color: "#6DA430",
                    backgroundColor: "#F6FAF3",
                    height: "36px",
                  }}
                >
                  Download csv
                </Button>
              </Grid>
              <Grid item className="customSearch" mr={1} width={"150px"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyleTime
                    label="Start Time"
                    value={StartTime}
                    onChange={handleStartTimeChange}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item className="customSearch" mr={1} width={"150px"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyleTime
                    label="End time"
                    value={EndTime}
                    onChange={handleEndTimeChange}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    disabled={!StartTime}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item className="customSearch">
                <CommonDatePicker
                  getDataFromChildHandler={getDataFromChildHandler}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(5).fill("15%")}
            actions={new Array(2).fill(0)}
          />
        ) : (
          <CustomTable
            page={page}
            rows={getFormattedData(sosHistory?.combinedHistory)}
            columns={columns}
            setPage={setPage}
            count={sosHistory?.count}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Grid>
    </>
  );
}
