"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  IconButton,
  DialogActions,
  Button,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
// ** core component
import { MdOutlineAssignment } from "react-icons/md";
import CommonDialog from "../common-dialog";
import CustomTooltip from "../../Tooltip";
import FirstTab from "../assign-dialog/SelectTab";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import ConfirmationDialog from "@/app/(components)/mui-components/Dialog/confirmation-dialog";
import axiosInstance from "@/app/api/axiosInstance";
import { AxiosError } from "axios";

interface ErrorResponse {
  error?: string;
}
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  url: string;
  macId: string;
  deviceAssign?: boolean;
  reFetch: () => Promise<void>;
}
export default function AssignAssessment({
  macId,
  url,
  open,
  setOpen,
  title,
  reFetch,
  deviceAssign,
}: Props) {
  const { handleSubmit, reset } = useForm();

  const [select, setSelect] = useState<null | string>(null);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [itemId, setItemId] = useState<string | undefined>("");
  const [getAllList, setGetAllList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<any>(0);
  const [mode, setMode] = useState<any>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const steps = ["Select mode", deviceAssign ? "Devices" : "Users"];
  const getModes = async () => {
    try {
      const res = await axiosInstance.get(`/api/device/get-all-purchase-mode`);
      if (res?.status === 200 || res?.status === 201) {
        console.log(res);
        setMode(res?.data?.data?.purchasedMode);
      }
    } catch (err) {}
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelectedMode(name);
  };

  useEffect(() => {
    if (open) {
      getModes();
    }
  }, [open]);

  const getData = async () => {
    setLoading(true);
    try {
      let res;
      if (deviceAssign) {
        res = await axiosInstance.get(
          `${url}&page=${
            page + 1
          }&limit=${rowsPerPage}&searchQuery=${searchQuery}`
        );
      } else {
        res = await axiosInstance.get(
          `${url}?page=${
            page + 1
          }&limit=${rowsPerPage}&searchQuery=${searchQuery}&role=0`
        );
      }

      if (res?.status === 200 || res?.status === 201) {
        console.log(res);
        setGetAllList(res?.data?.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (open) {
      getData();
    }
  }, [open, page, rowsPerPage, searchQuery]);

  const handleRadioChange = (
    item: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelect((prev: any) => (prev?._id === item._id ? null : item));
    setItemId(deviceAssign ? item?.macId : item?._id);
  };
  const handleClose = () => {
    setOpen(false);
    setSelect(null);
    setSearchQuery("");
    reset();
    setActiveStep(0);
    setSelectedMode("");
  };

  const handleAssessmentSubmit = async () => {
    if (!Boolean(select)) {
      notifyError("please select at least one item!");
      return;
    }
    let body = {
      macId: deviceAssign ? itemId : macId,
      id: deviceAssign ? macId : itemId,
    };
    try {
      const res = await axiosInstance.patch(
        `/api/device/assign-device/${selectedMode}`,
        body
      );
      if (res?.status === 200 || res?.status === 201) {
        notifySuccess("Assign Successful");
        reFetch();
        handleClose();
      }
    } catch (error) {
      handleClose();
      const axiosError = error as AxiosError<ErrorResponse>;
      notifyError(axiosError?.response?.data?.error || "Error creating user");
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedMode) {
      notifyError("please select at least one item!");
      return;
    }
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };
  const onsubmit = async () => {
    handleNext();
  };
  return (
    <div>
      <CommonDialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        title={title}
        onClose={handleClose}
        titleConfirm={"Cancel"}
        message={"Are you sure you want to cancel?"}
      >
        <Stepper
          sx={{ padding: "20px" }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form
          onSubmit={handleSubmit(
            activeStep === 0 ? onsubmit : handleAssessmentSubmit
          )}
        >
          <DialogContent>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                {mode?.map((item: any, index: any) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={item?._id}
                          checked={selectedMode === item?._id}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={item?.mode}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {activeStep === 1 && (
              <FirstTab
                select={select}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                getAllList={getAllList}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                handleRadioChange={handleRadioChange}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </DialogContent>
          <DialogActions className="dialog-action-btn">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ width: "150px" }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" type="submit" sx={{ width: "150px" }}>
                Submit
              </Button>
            ) : (
              <Button
                // onClick={handleNext}
                type="submit"
                variant="contained"
                sx={{ width: "150px" }}
              >
                Next
              </Button>
            )}
          </DialogActions>
        </form>
      </CommonDialog>
    </div>
  );
}
