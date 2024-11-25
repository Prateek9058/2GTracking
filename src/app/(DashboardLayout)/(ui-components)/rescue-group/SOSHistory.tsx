"use client";
import React, { useState, useEffect } from "react";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's";
import axiosInstance from "@/app/api/axiosInstance";
import { useParams } from "next/navigation";
import moment from "moment";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
// import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import MapLocation from "@/app/(components)/mui-components/Dialog/location/mapPopup";
export default function Tableprofile() {
  const { deviceProfile } = useParams<{ deviceProfile: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<any>(10);
  const [sosHistory, setSosHistory] = useState<any>([]);
  const [date, setDate] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleClickOpenMap = (location: any) => {
    setSelectedLocation(location);
    setOpen(true);
  };

  const getDataFromChildHandler = (date: any, dataArr: any) => {
    setDate(date);
  };
  const getSosHistory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `api/device/sos-history/673db449153ba646f82bdbe8?page=${
          page + 1
        }&limit=${rowsPerPage}&startDate=${moment(date?.[0]?.startDate).format(
          "YYYY-MM-DD"
        )}&endDate=${moment(date?.[0]?.endDate).format("YYYY-MM-DD")}`
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
  }, [page, rowsPerPage, date]);
  const columns = [
    "Sno.",
    "Value",
    "Date and Time",
    // "Location"
  ];
  const getFormattedData = (data: any[]) => {
    return data?.map((item, index) => ({
      sno: index + 1,
      // SOS: (
      //   <Typography variant="h6" style={{ color: item?.SOS ? "red" : "green" }}>
      //     {item?.SOS ? "True" : "False"}
      //   </Typography>
      // ),
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
              <Grid item className="customSearch">
                {/* <CommonDatePicker
                  getDataFromChildHandler={getDataFromChildHandler}
                /> */}
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
