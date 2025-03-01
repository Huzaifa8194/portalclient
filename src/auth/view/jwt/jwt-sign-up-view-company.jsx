"use client"

import { z as zod } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import LoadingButton from "@mui/lab/LoadingButton"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"

import { useBoolean } from "src/hooks/use-boolean"
import { Form, Field } from "src/components/hook-form"

import { signUp } from "../../context/jwt"
import { useAuthContext } from "../../hooks"
import { FormHead } from "../../components/form-head"
import { SignUpTerms } from "../../components/sign-up-terms"

// ----------------------------------------------------------------------

export const SignUpSchemaCompany = zod
  .object({
    name: zod.string().min(1, { message: "Company name is required!" }),

    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),

    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),

    passwordConfirmation: zod.string().min(1, { message: "Password confirmation is required!" }),

    company_reg_no: zod.string().min(1, { message: "Company registration number is required!" }),
    company_reg_date: zod.string().refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Company registration date must be a valid date!",
    }),

    company_business_code: zod.string().min(1, { message: "Business code is required!" }),
    company_web: zod.string().url({ message: "Company website must be a valid URL!" }),

    address: zod.string().min(1, { message: "Address is required!" }),
    currently_residing: zod.string().min(1, { message: "Country residing in is required!" }),

    company_no_of_employees: zod.string().regex(/^\d+$/, { message: "Number of employees must be a number!" }),

    company_certified_employer: zod
      .string()
      .refine((value) => ["Yes", "No"].includes(value), { message: "Certified employer must be Yes or No!" }),

    company_job_arbetsformedlingen: zod
      .string()
      .refine((value) => ["Yes", "No"].includes(value), { message: "Job Arbetsförmedlingen must be Yes or No!" }),

    company_collective_agreement: zod
      .string()
      .refine((value) => ["Yes", "No"].includes(value), { message: "Collective agreement must be Yes or No!" }),

    company_applied_work_permit: zod
      .string()
      .refine((value) => ["Yes", "No"].includes(value), { message: "Applied for work permit must be Yes or No!" }),

    company_hr_contact: zod
      .string()
      .regex(/^\+?\d{7,15}$/, { message: "HR contact number must be a valid phone number!" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match!",
    path: ["passwordConfirmation"],
  })

// ----------------------------------------------------------------------

export function JwtSignUpViewCompany() {
  const { checkUserSession } = useAuthContext()

  const router = useRouter()

  const password = useBoolean()

  const [errorMsg, setErrorMsg] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const steps = ["Company Information", "Additional Details"]

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    company_reg_no: "",
    company_reg_date: "",
    company_business_code: "",
    company_web: "",
    address: "",
    currently_residing: "",
    company_no_of_employees: "",
    company_certified_employer: "",
    company_job_arbetsformedlingen: "",
    company_collective_agreement: "",
    company_applied_work_permit: "",
    company_hr_contact: "",
  }

  const methods = useForm({
    resolver: zodResolver(SignUpSchemaCompany),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data)
      await checkUserSession?.()
      router.refresh()
    } catch (error) {
      console.error(error)
      setErrorMsg(typeof error === "string" ? error : error.message)
    }
  })

  const YES_NO_OPTIONS = [
    { value: " ", label: "Choose Option" },
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {activeStep === 0 ? (
        <>
          {/* Page 1 fields */}
          {/* Name and Email */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="name" label="Company Name" InputLabelProps={{ shrink: true }} />
            <Field.Text name="email" label="Email" InputLabelProps={{ shrink: true }} />
          </Box>

          {/* Password and Confirmation */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text
              name="password"
              label="Password"
              placeholder="6+ characters"
              type={password.value ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="passwordConfirmation"
              label="Confirm Password"
              placeholder="6+ characters"
              type={password.value ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Company Registration */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="company_reg_no" label="Company Registration Number" InputLabelProps={{ shrink: true }} />
            <Field.DatePicker
              name="company_reg_date"
              label="Company Registration Date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Business Code and Website */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Text name="company_business_code" label="Business Code" InputLabelProps={{ shrink: true }} />
            <Field.Text name="company_web" label="Company Website" InputLabelProps={{ shrink: true }} />
          </Box>
        </>
      ) : (
        <>
          {/* Page 2 fields */}
          {/* Address and Location */}
          <Field.CountrySelect
            name="currently_residing"
            label="Country Residing In"
            InputLabelProps={{ shrink: true }}
          />
          <Field.Text name="address" label="Address" InputLabelProps={{ shrink: true }} />

          {/* Number of Employees */}
          <Field.Text name="company_no_of_employees" label="Number of Employees" InputLabelProps={{ shrink: true }} />

          {/* Certified Employer and Job Arbetsförmedlingen */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Select
              native
              name="company_certified_employer"
              label="Certified Employer"
              InputLabelProps={{ shrink: true }}
            >
              {YES_NO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>

            <Field.Select
              native
              name="company_job_arbetsformedlingen"
              label="Job Posted on Arbetsförmedlingen"
              InputLabelProps={{ shrink: true }}
            >
              {YES_NO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
          </Box>

          {/* Collective Agreement and Applied for Work Permit */}
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
            <Field.Select
              native
              name="company_collective_agreement"
              label="Collective Agreement"
              InputLabelProps={{ shrink: true }}
            >
              {YES_NO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>

            <Field.Select
              native
              name="company_applied_work_permit"
              label="Applied for Work Permit"
              InputLabelProps={{ shrink: true }}
            >
              {YES_NO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field.Select>
          </Box>

          {/* HR Contact */}
          <Field.Text name="company_hr_contact" label="HR Contact Number" InputLabelProps={{ shrink: true }} />
        </>
      )}

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {activeStep > 0 && (
          <LoadingButton color="inherit" variant="outlined" onClick={handleBack}>
            Back
          </LoadingButton>
        )}
        {activeStep === 0 ? (
          <LoadingButton  variant="contained" onClick={handleNext}>
            Next
          </LoadingButton>
        ) : (
          <LoadingButton
            halfwidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Creating account..."
          >
            Create account
          </LoadingButton>
        )}
      </Box>
    </Box>
  )

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ minHeight: "100vh" }}>
      {/* Left Side - Image (40%) */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          bgcolor: "background.paper",
          p: 4,
        }}
      >
        <Box
          component="img"
          src="/company.svg"
          alt="Company Illustration"
          sx={{
            width: "90%",
            height: "auto",
            maxWidth: "500px",
          }}
        />
      </Box>

      {/* Right Side - Form and Stepper (60%) */}
      <Box
        sx={{
          width: { xs: "110%", md: "60%" },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", width: "100%", maxWidth: "800px" }}>
          {/* Form */}
          <Paper
            
            sx={{
              flexGrow: 1,
              p: 4,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              mr: 2,
            }}
          >
            <FormHead
              title="Get started absolutely free"
              description={
                <>
                  {`Already have an account? `}
                  <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
                    Sign in
                  </Link>
                </>
              }
              sx={{ mb: 4, textAlign: "center" }}
            />

            {!!errorMsg && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMsg}
              </Alert>
            )}

            <Form methods={methods} onSubmit={onSubmit}>
              {renderForm}
            </Form>

            <SignUpTerms />
          </Paper>

          {/* Stepper */}
          <Paper
            elevation={3}
            sx={{
              width: "160px",
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              height: "fit-content",
            }}
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Box>
      </Box>
    </Stack>
  )
}

