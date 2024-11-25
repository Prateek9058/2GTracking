import * as React from "react";
import Box from "@mui/material/Box";
import { signOut } from "next-auth/react";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      ></Box>
    </React.Fragment>
  );
}
