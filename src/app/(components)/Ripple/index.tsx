import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { io, Socket } from "socket.io-client";
import CommonDialog from "@/app/(components)/mui-components/Dialog/confirm";

const RippleFab = styled(Fab)<{ isBlinking: boolean }>(
  ({ theme, isBlinking }) => ({
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    animation: isBlinking ? "blink 1s infinite" : "none",
    "@keyframes blink": {
      "0%": { opacity: 1 },
      "50%": { opacity: 0.5 },
      "100%": { opacity: 1 },
    },
  })
);

export default function RippleComp({ location, getLocationData }: any) {
  const [isVisible, setIsVisible] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [open, setOpen] = useState<any>(false); // State to manage dialog visibility
  const [deviceUpdateData, setDeviceUpdateData] = useState<any>(null); // New state for device updates
  console.log("Check deviceUpdateData", deviceUpdateData);
  const handleClose = () => setOpen(false);

  const handleDisableConfirm = async () => {
    try {
      const response = await fetch(
        `https://apitrack.psiborg.io/api/device/sos-off/${location?.device?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "SOS deactivated",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to disable SOS");
      }
      const data = await response.json();
      console.log("SOS disabled successfully:", data);

      // Refresh location data
      getLocationData();

      // Emit socket event to inform about SOS deactivation
      socket?.emit("deviceUpdate", {
        deviceId: location?.device?._id,
      });

      setOpen(false); // Close the dialog after confirmation
    } catch (error) {
      console.error("Error disabling SOS:", error);
    }
  };

  const handleOpen = () => {
    if (location?.device?.SOS) {
      setOpen(true); // Open the dialog when SOS button is clicked
    }
  };

  useEffect(() => {
    const newSocket = io("https://api.trulynk.org/");
    setSocket(newSocket);
    newSocket?.emit("joinRoom", {
      deviceId: location?.device?._id,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjY3M2RiNDQ5MTUzYmE2NDZmODJiZGJlOCIsInVzZXIiOiI2NzNkYWZmZTE1M2JhNjQ2ZjgyYmQ5MGEiLCJpYXQiOjE3MzIyODUzNzgsImV4cCI6MTczMzAwNTM3OH0.5CJ78jfk4HARdzZdX5KG5FIzU8cDe_AocjaW99j54wk",
    });
    newSocket.on("deviceUpdate", (data) => {
      console.log("Checkdata", data);
      if (data?._id === location?.device?._id) {
        getLocationData();
        setDeviceUpdateData(data);
        setIsVisible(true);
      }
    });
    return () => {
      newSocket.disconnect();
    };
  }, [location]);

  return (
    <>
      <CommonDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleDisableConfirm}
        message={"Are you sure you want to disable the SOS?"}
        title="SOS Confirmation"
      />
      <RippleFab
        onClick={handleOpen}
        color={location?.device?.SOS ? "error" : "default"}
        aria-label="sos"
        isBlinking={location?.device?.SOS}
        sx={{
          display: isVisible ? "flex" : "none",
          transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
          position: "fixed",
          bottom: "20px",
          zIndex: 9999,
          visibility: isVisible ? "visible" : "hidden",
          right: "20px",
          cursor: !location?.device?.SOS ? "not-allowed" : "pointer",
          bgcolor: !location?.device?.SOS ? "default" : "error.main",
        }}
      >
        SOS
      </RippleFab>
    </>
  );
}
