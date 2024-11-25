"use client";
import React from "react";
import { Grid, Typography } from "@mui/material";

interface Props {
  listingHead: string[];
  listingData: any[];
}

const DetailsListing: React.FC<Props> = ({ listingHead, listingData }) => {
  const data = listingData[0]; // Since we only want to display one set of data

  // Add a check to ensure data is defined
  if (!data) {
    return null; // Or display a loading indicator or a message
  }

  return (
    <Grid container spacing={3}>
      {listingHead.map((head, index) => {
        const key = head.toLowerCase().replace(/\s/g, "");
        return (
          <Grid item md={3} key={index}>
            <Typography mb={1} variant="body1" color="info">
              {head}
            </Typography>
            <Typography variant="h4">
              {data[key] !== undefined ? data[key] : "N/A"}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DetailsListing;
