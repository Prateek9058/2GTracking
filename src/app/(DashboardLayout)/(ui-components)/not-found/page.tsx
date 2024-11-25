"use client";
import { Button, Grid, Typography } from "@mui/material";
import notFoundImg from "../../../../../public/Img/notfound.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundColor: "#00028C",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid item>
        <Image src={notFoundImg} width={600} alt="page not found" />
      </Grid>

      <Grid item>
        <Typography variant="h2" color="white">
          Could not find requested resource
        </Typography>
      </Grid>
      <Grid item mt={2}>
        <Button
          onClick={() => router.push("/")}
          variant="outlined"
          size="large"
          sx={{
            border: "1px solid #6DA430",
            color: "#6DA430",
            backgroundColor: "#F6FAF3",
            "&:hover": {
              backgroundColor: "#6DA430",
              color: "#F6FAF3",
            },
          }}
        >
          Return Home
        </Button>
      </Grid>
    </Grid>
  );
}
