import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Step {
  timeLineLat: any;
  label: string;
  description: string;
  timeStamp: any;
}

interface Props {
  steps: Step[];
  setTimeLineLoc: any;
}

const TextMobileStepper: React.FC<Props> = ({ steps, setTimeLineLoc }) => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleStepClick = (step: number) => {
    setTimeLineLoc({
      lat: steps[step].timeLineLat.lat,
      lon: steps[step].timeLineLat.lon,
    });

    setActiveStep(step);
    document
      .getElementById(`step-${step}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    document
      .getElementById(`step-${activeStep + 1}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    document
      .getElementById(`step-${activeStep - 1}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#6DA430",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#6DA430",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#6DA430",
    },
  }));

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", bgcolor: "#00028C" }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1, color: "white" }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          sx={{ color: "white" }}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown />
          )}
        </Button>
      </Box>
      <Box
        p={1}
        sx={{
          width: "100%",
          overflowY: "auto",
          height: lg ? "300px" : "562px",
        }}
      >
        <Stepper
          orientation="vertical"
          nonLinear
          activeStep={activeStep}
          connector={<CustomStepConnector />}
        >
          {steps?.map((step, index) => (
            <Step key={step.label} id={`step-${index}`}>
              <StepButton onClick={() => handleStepClick(index)}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: activeStep === index ? "#6DA430" : "white",
                      "& .MuiStepIcon-text": {
                        display: "none",
                      },
                      "&.Mui-active": {
                        color: "#6DA430",
                      },
                      "&.Mui-completed": {
                        color: "#6DA430",
                      },
                    },
                  }}
                >
                  <Typography variant="body1" color="white">
                    {step?.label ? step?.label : step?.description}
                    <Typography variant="body1" color="white">
                      {" "}
                      {step?.timeStamp}
                    </Typography>
                  </Typography>
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default TextMobileStepper;
