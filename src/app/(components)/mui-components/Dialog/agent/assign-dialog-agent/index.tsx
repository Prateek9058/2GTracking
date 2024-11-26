"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IconButton,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
// ** core component
import { MdOutlineAssignment } from "react-icons/md";
import CommonDialog from "../../common-dialog";
import CustomTooltip from "../../../Tooltip";
import FirstTab from "./SelectTab";
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
  role?: any;
}
export default function AssignAssessment({
  macId,
  url,
  open,
  setOpen,
  title,
  reFetch,
  deviceAssign,
  role,
}: Props) {
  const { handleSubmit, reset } = useForm();

  const [select, setSelect] = useState<any[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<any>(10);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [itemId, setItemId] = useState<string | undefined>("");
  const [getAllList, setGetAllList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /// api ti get datas  ///
  const getData = async () => {
    setLoading(true);
    try {
      let res = await axiosInstance.get(
        `${url}?page=${
          page + 1
        }&limit=${rowsPerPage}&searchQuery=${searchQuery}&role=${role}`
      );

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
    if (role === 0) {
      setSelect((prev: any) => {
        if (
          prev?.some(
            (selectedItem: { _id: any }) => selectedItem?._id === item?._id
          )
        ) {
          return prev?.filter(
            (selectedItem: { _id: any }) => selectedItem?._id !== item?._id
          );
        } else {
          return [...prev, item];
        }
      });
    } else {
      setSelect((prev: any) => (prev?._id === item._id ? null : item));
      setItemId(deviceAssign ? item?.macId : item?._id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelect([]);
    setSearchQuery("");
    reset();
  };

  const handleAssessmentSubmit = async () => {
    if (!Boolean(select)) {
      notifyError("Please select at least one item!");
      return;
    }
    let body;
    if (role == 1) {
      body = { user: [macId], agent: itemId };
    } else if (role === 0) {
      body = { user: select?.map((item) => item?._id), agent: macId };
    } else {
      body = { user: [itemId], agent: macId };
    }
    try {
      const res = await axiosInstance.patch("api/user/assign-agent", body);
      if (res?.status === 200 || res?.status === 201) {
        notifySuccess("Assign Successful");
        reFetch();
        handleClose();
      }
    } catch (error) {
      handleClose();
      const axiosError = error as AxiosError<ErrorResponse>;
      notifyError(axiosError?.response?.data?.error || "Error assigning agent");
    }
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
        <form onSubmit={handleSubmit(handleAssessmentSubmit)}>
          <DialogContent>
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
              role={role}
            />
          </DialogContent>
          <DialogActions className="dialog-action-btn">
            <ConfirmationDialog
              title={"Cancel"}
              message={"Are you sure you want to cancel?"}
              handleCloseFirst={handleClose}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </CommonDialog>
    </div>
  );
}
