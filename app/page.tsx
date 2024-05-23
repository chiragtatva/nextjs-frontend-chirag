"use client";
import Image from "next/image";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import * as React from "react";
import MuiTextField from "../components/input/MuiTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckIcon from "@mui/icons-material/Check";
import {
  fileUploadConditions,
  termsAndConditions,
} from "@/utils/constants/consts";
import MuiPhoneNumber from "material-ui-phone-number-2";
import DragAndDropFile from "../components/input/DragAndDropInput";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation'
import { MUTATION } from '../libs/graphql.mutation'


const validationSchema = yup.object({
  step1: yup.object({
    companyUEN: yup.string().matches(/^[0-9]{8}[A-Z]$/, 'Invalid UEN format').required("Company UEN is required "),
    companyName: yup.string().required("Company Name is required"),
  }),
  step2: yup.object({
    fullName: yup.string().required("Full Name is required"),
    position: yup.string().required("Position is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    reEmail: yup
      .string()
      .test("emails-match", "Emails must match", function (value) {
        return value === this.parent.email;
      })
      .email("Enter a valid email")
      .required("Email is required"),
    contact: yup.string().required("Mobile Number is required"),
  }),
});

export default function HomePage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [files, setFiles] = React.useState<File[]>([]);
  const navigate = useRouter();
  const [mutate, {error}] = useMutation(MUTATION);

  const formik = useFormik({
    initialValues: {
      step1: {
        companyUEN: "",
        companyName: "",
      },
      step2: {
        fullName: "",
        position: "",
        email: "",
        reEmail: "",
        contact: "",
      },
      step4: { isConditionsAccepted: false },
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      submitFunction(values);
    },
  });

  const submitFunction = (values: any) => {

    const smeHealthInput = {
      ...values.step1,
      ...values.step2,
      ...values.step4,
    };
    mutate({ variables: { files, smeHealthInput } });
    if (!error) {
      navigate.push('/applications')
    }
  };

  const isStep2Disabled = React.useMemo(
    () => Boolean(formik.errors.step1),
    [formik.errors.step1]
  );
  const isStep3Disabled = React.useMemo(
    () => Boolean(formik.errors.step1) || Boolean(formik.errors.step2),
    [formik.errors.step1, formik.errors.step2]
  );

  const isStep4Disabled = React.useMemo(
    () => Boolean(formik.errors.step1) || Boolean(formik.errors.step2) || !Boolean(files.length),
    [formik.errors.step1, formik.errors.step2, files.length]
  );

  const onContactValueChange = (value: string) => {
    formik.setFieldValue("step2.contact", value, true);
  };
  const onFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };
  return (
    <Box>
      <Box
        sx={{ backgroundImage: "url(/header-bg.jpg)", backgroundSize: "cover" }}
      >
        <Box
          sx={{
            margin: {
              sm: "24px",
              md: "0px 180px !important",
              lg: "0px 192px !important",
            },
            padding: "24px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image src={"/logo.svg"} height={78} width={134} alt="logo"></Image>
          <Typography sx={{ color: "white", fontSize: "28px" }} variant="h5">
            SME HealthCheck - Get Started
          </Typography>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "rgb(245, 248, 250)" }}>
        <Box
          sx={{
            maxWidth: "calc(1150px - 64px)",
            margin: "auto",
            padding: "48px 32px",
            backgroundColor: "white",
            boxShadow: "rgb(0 0 0 / 10%) 0px 4px 15px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stepper 
              activeStep={activeStep} 
              orientation="vertical">
              <Step completed={ formik.touched.step1 && !Boolean(formik.errors.step1)} sx={!formik.errors.step1 && { '& .MuiStepIcon-root': { color: 'green !important' } }} >
                <StepLabel
                  error={formik.touched.step1 && Boolean(formik.errors.step1)}
                  sx={{ marginBottom: "16px" }}
                >
                  <Box
                    className="stepHeader"
                    sx={{
                      backgroundColor: "rgb(96, 26, 121)",
                      fontSize: "20px",
                    }}
                  >
                    Company Information
                  </Box>
                </StepLabel>
                <StepContent TransitionProps={{ in: true }}>
                  <Grid sx={{ paddingLeft: "8px" }} container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <MuiTextField
                        name="step1.companyUEN"
                        label="Company UEN"
                        value={formik.values.step1.companyUEN}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.step1?.companyUEN &&
                          Boolean(formik.errors.step1?.companyUEN)
                        }
                        helperText={
                          formik.touched.step1?.companyUEN &&
                          formik.errors.step1?.companyUEN
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MuiTextField
                        name="step1.companyName"
                        label="Company Name"
                        value={formik.values.step1.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.step1?.companyName &&
                          Boolean(formik.errors.step1?.companyName)
                        }
                        helperText={
                          formik.touched.step1?.companyName &&
                          formik.errors.step1?.companyName
                        }
                      />
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
              <Step completed={ formik.touched.step2 && !Boolean(formik.errors.step2)} sx={!formik.errors.step2 && { '& .MuiStepIcon-root': { color: 'green !important' } }}>
                <StepLabel
                  error={
                    !isStep2Disabled &&
                    formik.touched.step2 &&
                    Boolean(formik.errors.step2)
                  }
                  
                  sx={{ marginBottom: "16px" }}
                >
                  <Box
                    className="stepHeader"
                    sx={{
                      backgroundColor: "rgb(96, 26, 121)",
                      fontSize: "20px",
                    }}
                  >
                    Applicant Information
                  </Box>
                </StepLabel>
                <StepContent TransitionProps={{ in: true }}>
                  <Grid sx={{ paddingLeft: "8px" }} container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <MuiTextField
                        name="step2.fullName"
                        label="Full Name"
                        value={formik.values.step2.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched?.step2?.fullName &&
                          Boolean(formik.errors.step2?.fullName)
                        }
                        disabled={isStep2Disabled}
                        helperText={
                          formik.touched.step2?.fullName &&
                          formik.errors.step2?.fullName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MuiTextField
                        name="step2.position"
                        label="Position within company"
                        value={formik.values.step2.position}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isStep2Disabled}
                        error={
                          formik.touched.step2?.position &&
                          Boolean(formik.errors.step2?.position)
                        }
                        helperText={
                          formik.touched.step2?.position &&
                          formik.errors.step2?.position
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MuiTextField
                        name="step2.email"
                        label="Email Address"
                        value={formik.values.step2.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isStep2Disabled}
                        error={
                          formik.touched.step2?.email &&
                          Boolean(formik.errors.step2?.email)
                        }
                        helperText={
                          formik.touched.step2?.email &&
                          formik.errors.step2?.email
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MuiTextField
                        name="step2.reEmail"
                        label="Re-enter Email Address"
                        value={formik.values.step2.reEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isStep2Disabled}
                        error={
                          formik.touched.step2?.reEmail &&
                          Boolean(formik.errors.step2?.reEmail)
                        }
                        helperText={
                          formik.touched.step2?.reEmail &&
                          formik.errors.step2?.reEmail
                        }
                        enablePaste={false}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MuiPhoneNumber
                        name="step2.contact"
                        label="Mobile Number"
                        defaultCountry="sg"
                        variant="outlined"
                        fullWidth
                        value={formik.values.step2.contact}
                        onChange={(value) =>
                          onContactValueChange(value as string)
                        }
                        onlyCountries={["sg"]}
                        onBlur={formik.handleBlur}
                        disabled={isStep2Disabled}
                        error={
                          formik.touched.step2?.contact &&
                          Boolean(formik.errors.step2?.contact)
                        }
                        helperText={
                          formik.touched.step2?.contact &&
                          formik.errors.step2?.contact
                        }
                      />
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>

              <Step completed={ Boolean(files.length) } sx={Boolean(files.length) && { '& .MuiStepIcon-root': { color: 'green !important' } }}>
                <StepLabel sx={{ marginBottom: "16px" }}>
                  <Box
                    className="stepHeader"
                    sx={{
                      backgroundColor: "rgb(96, 26, 121)",
                      fontSize: "20px",
                    }}
                  >
                    Upload Documents
                  </Box>
                </StepLabel>
                <StepContent TransitionProps={{ in: true }}>
                  <Grid sx={{ paddingLeft: "8px" }} container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <DragAndDropFile
                        onChange={onFilesChange}
                        disabled={isStep3Disabled}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <List>
                        {fileUploadConditions.map((item, index) => {
                          return (
                            <ListItem alignItems="flex-start" key={index}>
                              <ListItemIcon sx={{ minWidth: "40px" }}>
                                <CheckIcon />
                              </ListItemIcon>
                              <ListItemText
                                sx={{ opacity: 0.6 }}
                                primary={item}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
              <Step completed={ !Boolean(formik.errors.step2) && formik.values.step4.isConditionsAccepted } sx={formik.values.step4.isConditionsAccepted && { '& .MuiStepIcon-root': { color: 'green !important' } }}>
                <StepLabel sx={{ marginBottom: "16px" }}>
                  <Box
                    className="stepHeader"
                    sx={{
                      backgroundColor: "rgb(96, 26, 121)",
                      fontSize: "20px",
                    }}
                  >
                    Terms & Conditions
                  </Box>
                </StepLabel>
                <StepContent TransitionProps={{ in: true }}>
                  <Box sx={{ paddingLeft: "8px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={formik.values.step4.isConditionsAccepted}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="step4.isConditionsAccepted"
                          disabled={isStep4Disabled}
                        />
                      }
                      label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
                    />
                    <List>
                      {termsAndConditions.map((item, index) => {
                        return (
                          <ListItem alignItems="flex-start" key={index}>
                            <ListItemIcon sx={{ minWidth: "50px" }}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                              sx={{ opacity: 0.6 }}
                              primary={item}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button type="submit" variant="contained" disabled={isStep4Disabled || isStep3Disabled || isStep2Disabled || !Boolean(formik.values.step4.isConditionsAccepted)}>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
