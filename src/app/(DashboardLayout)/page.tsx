"use client";
import React from "react";
import { useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import salesIcon from "../../../public/Img/sales.png";
import CustomGraph from "@/app/(components)/mui-components/CustomGraph";
import deviceIcon from "../../../public/Img/device.png";
import users from "../../../public/Img/users.png";
import clock from "../../../public/Img/clock.png";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
interface StatCardProps {
  title: string;
  value: number;
  change: string;
  selected: boolean;
  onClick: () => void;
}
type GetDataHandler = () => void;
interface ViewCountData {
  _id: string;
  views: number;
}
const StatCard = styled(Card)<{ selected: boolean }>(({ theme, selected }) => ({
  cursor: "pointer",
  borderRadius: "16px",
  backgroundColor: selected ? theme.palette.primary.main : "#fff",
  color: selected ? "#fff" : theme.palette.text.primary,
  fontWeight: "700",
  "&:hover": {
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.action.hover,
  },
}));
import ManagementGrid from "@/app/(components)/mui-components/Card";
const Page = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(
    "totalRegisteredDevices"
  );
  const getDataFromChildHandler: GetDataHandler = () => {};
  const viewCount: ViewCountData[] = [
    {
      _id: "20/03/2023",
      views: 45,
    },
    {
      _id: "24/03/2023",
      views: 23,
    },
    {
      _id: "25/03/2023",
      views: 5,
    },
    {
      _id: "27/03/2023",
      views: 16,
    },
    {
      _id: "29/03/2023",
      views: 35,
    },
    {
      _id: "30/03/2023",
      views: 30,
    },
  ];
  const stats = [
    {
      title: "Total Registered Devices",
      value: 764,
      change: "+8% from yesterday",
      id: "totalRegisteredDevices",
      icon: salesIcon,
    },
    {
      title: "Total Active Devices",
      value: 300,
      change: "+5% from yesterday",
      id: "totalActiveDevices",
      icon: deviceIcon,
    },
    {
      title: "Total Number of Users",
      value: 698,
      change: "+8% from yesterday",
      id: "totalNumberOfUsers",
      icon: users,
    },
    {
      title: "Pending Subscriptions",
      value: 126,
      change: "+5% from yesterday",
      id: "pendingSubscriptions",
      icon: clock,
    },
  ];

  const handleCardClick = (id: string) => {
    setSelectedCard(selectedCard === id ? null : id);
  };
  return (
    <Grid sx={{ padding: "12px 15px" }}>
      <ManagementGrid moduleName="Dashboard" subHeading="Track your Kids" />
      <Grid container my={2} justifyContent="space-between" rowGap="20px">
        {stats.map((stat) => (
          <Grid md={2.8} key={stat.id}>
            <StatCard
              key={stat.id}
              selected={selectedCard === stat.id}
              onClick={() => handleCardClick(stat.id)}
            >
              <CardContent>
                <Grid container alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor:
                        selectedCard === stat.id ? "white" : "#A9FB50",
                    }}
                  >
                    <Image src={stat?.icon} alt="icon" />
                  </Avatar>
                  <Typography
                    variant="h3"
                    sx={{
                      color: selectedCard === stat.id ? "#A9FB50" : "#00028C",
                    }}
                    component="div"
                  >
                    {stat.value}
                  </Typography>
                </Grid>

                <Typography
                  sx={{
                    margin: "16px 0px",
                    color: selectedCard === stat.id ? "#A9FB50" : "#6D6ED1",
                  }}
                  color="textSecondary"
                >
                  {stat.change}
                </Typography>
                <Typography variant="h4">{stat.title}</Typography>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ backgroundColor: "white", borderRadius: "10px" }} p={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography component={"h3"} variant="h3" color="info">
            See your total Registered devices
          </Typography>
        </Grid>
        <Grid container py={1} gap={1}>
          <Typography component={"h1"} variant="h1" color="primary">
            764
          </Typography>
          <Typography
            sx={{
              margin: "16px 0px",
              color: "#6DA430",
            }}
            color="textSecondary"
          >
            +8% from yesterday
          </Typography>
        </Grid>
        <Grid pt={2}>
          <CustomGraph viewCount={viewCount} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
