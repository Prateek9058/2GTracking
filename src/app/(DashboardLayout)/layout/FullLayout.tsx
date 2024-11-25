"use client";
import { styled, Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import PageContainer from "@/app/(components)/container/PageContainer";
const MainWrapper = styled("div")(() => ({}));
const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainWrapper>
      <PageContainer
        title="Kids Tracking"
        description="IoT based Kids Tracking and Health Device"
      >
        <PageWrapper>
          <div>
            <Header />

            <Box p={2}>{children}</Box>
          </div>
        </PageWrapper>
      </PageContainer>
    </MainWrapper>
  );
}
