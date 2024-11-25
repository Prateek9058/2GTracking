import React from "react";
import {
  Box,
  AppBar,
  Grid,
  styled,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";
import logoKids from "../../../../../public/Img/logoPrim.png";
const Header = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    transition: "none",
    padding: "10px 30px 10px 30px",
    zIndex: "10",
    borderBottom: "0.5px solid #C8CBD9 ",
    backgroundColor: "#00028C",
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid
          item
          width={80}
          height={80}
          style={{
            overflow: "hidden",
          }}
        >
          <Image
            src={logoKids}
            alt="logo"
            width={80}
            height={80}
            style={{
              objectFit: "contain",
            }}
          />
        </Grid>
        <Grid item>
          <Typography color={"#fff"} variant="h2">
            Tracking Management
          </Typography>
        </Grid>
      </Grid>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
