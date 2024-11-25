import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Grid
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { IoMdCloseCircleOutline } from "react-icons/io";


interface CommonDialogProps extends DialogProps {
  onClose: () => void;
  title?: string;
  message?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  messageSize?: "small" | "medium" | "large";
  onConfirm?: () => void;
  onCancel?: () => void;
  icon?: boolean;
  deleteIcon?: any;
  heading?:string
}

const CommonDialog: React.FC<CommonDialogProps> = ({
  title = "Dialog Title",
  message = "Dialog Message",
  color = "primary",
  messageSize = "medium",
  onClose,
  onConfirm,
  heading,
  icon = true,
  deleteIcon,
  ...otherProps
}) => {
  const Icon = deleteIcon;
  const itemIcon = <Icon size="1.4rem" color="error" />;
  return (
    <Dialog onClose={onClose} {...otherProps}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <IoMdCloseCircleOutline color="white" />
      </IconButton>
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.error.main,
        }}
      >
        <Typography variant="h6" color={"white"}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"center"} alignItems={"center"} mt={2}>
          <Typography color="textPrimary" variant="h4" textAlign={"center"}>
            {heading}
          </Typography>
        
        </Grid>

        <Typography color="textPrimary" mt={2} textAlign={"center"}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        {onConfirm && (
          <Button onClick={onConfirm} color={color} variant="outlined">
            Confirm
          </Button>
        )}
        {onClose && (
          <Button onClick={onClose} color="inherit" variant="outlined">
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
