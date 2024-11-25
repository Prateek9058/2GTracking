"use client";
import React from "react";
import { Grid, Typography, AppBar, styled, Box } from "@mui/material";
import Breadcrumbs from "@/app/(components)/mui-components/Breadcrumbs";
import { Tabs, Tab, Button, Tooltip, IconButton } from "@mui/material";
import { IoMdAddCircleOutline } from "react-icons/io";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ConfirmationDialog from "@/app/(components)/mui-components/Dialog/confirmation-dialog";
import Link from "next/link";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

interface Breadcrumb {
  label: string;
  link: string;
}
interface ManagementGridProps {
  moduleName?: string;
  button?: any;
  subHeading?: string;
  handleClickOpen?: any;
  buttonUpload?: string;
  handleClickOpenUpload?: any;
  assignedData?: string | undefined;
  assigned?: boolean;
  deleteFunction?: () => void;
  breadcrumbItems?: Breadcrumb[];
  userId?: any;
  buttonAgent?: any;
  handleClickOpenAgent?: any;
  accessUnassign?: any;
}

const ManagementGrid: React.FC<ManagementGridProps> = ({
  moduleName,
  button,
  handleClickOpen,
  subHeading,
  buttonUpload,
  handleClickOpenUpload,
  assignedData,
  assigned,
  deleteFunction,
  breadcrumbItems,
  userId,
  buttonAgent,
  handleClickOpenAgent,
  accessUnassign,
}) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      {breadcrumbItems && <Breadcrumbs breadcrumbItems={breadcrumbItems} />}
      <Grid item>
        <Typography component={"h2"} variant="h2" color="primary" mb={1}>
          {moduleName}
        </Typography>
        <Typography component={"h6"} variant="body2" color="grey">
          {subHeading}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container gap={2}>
          {buttonUpload && (
            <Button
              onClick={handleClickOpenUpload}
              startIcon={<CloudUploadIcon />}
              variant="outlined"
              size="large"
              sx={{
                border: "1px solid #6DA430",
                color: "#6DA430",
                backgroundColor: "#F6FAF3",
              }}
            >
              {buttonUpload}
            </Button>
          )}
          {buttonAgent && (
            <Button
              onClick={handleClickOpenAgent}
              startIcon={<IoMdAddCircleOutline />}
              variant="outlined"
              size="large"
              sx={{
                border: "1px solid #6DA430",
                color: "#6DA430",
                backgroundColor: "#F6FAF3",
              }}
            >
              {buttonAgent}
            </Button>
          )}
          {button && (
            <Button
              onClick={handleClickOpen}
              startIcon={<IoMdAddCircleOutline />}
              variant="contained"
              size="large"
            >
              {button}
            </Button>
          )}

          {assigned && (
            <Grid
              container
              justifyContent="space-between"
              p={2}
              sx={{
                width: "250px",
                borderRadius: "16px",
                backgroundColor: "white",
                border: "0.6px solid #A3A4F433",
              }}
            >
              <Grid item>
                <Typography component={"h5"} variant="h5">
                  Assigned
                </Typography>
                <Tooltip title="View User">
                  <Link
                    target="_blank"
                    style={{ color: "#6DA430" }}
                    href={{
                      pathname: `/account-management/${userId}`,
                      query: { value: 0 },
                    }}
                  >
                    {assignedData}
                  </Link>
                </Tooltip>
              </Grid>
              <Grid item>
                {accessUnassign ? (
                  <Tooltip title="Delete User">
                    <IconButton aria-label="delete" size="small" disabled>
                      <PersonRemoveAlt1Icon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <ConfirmationDialog
                    title={"Unassigned"}
                    tooltip={"Unassigned"}
                    dltIcon={true}
                    iconAssign={"removeuser"}
                    message={"Are you sure you want to unassigned this user ?"}
                    deleteFunction={deleteFunction}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManagementGrid;
