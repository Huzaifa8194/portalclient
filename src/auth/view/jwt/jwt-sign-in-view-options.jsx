"use client"

import { z as zod } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import LoadingButton from "@mui/lab/LoadingButton"
import { Divider } from "@mui/material"
import { Icon } from "@iconify/react"
import Paper from "@mui/material/Paper" // Import Paper component

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"

import { useBoolean } from "src/hooks/use-boolean"
import { Form } from "src/components/hook-form"

import { signUp } from "../../context/jwt"
import { useAuthContext } from "../../hooks"
import { FormHead } from "../../components/form-head"
import { SignUpTerms } from "../../components/sign-up-terms"

// ----------------------------------------------------------------------

export const SignUpSchemaTemp2 = zod.object({
  firstName: zod.string().min(1, { message: "First name is required!" }),
  lastName: zod.string().min(1, { message: "Last name is required!" }),

  dateOfBirth: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),

  nationality: zod.string().min(1, { message: "Nationality is required!" }),
  placeofbirth: zod.string().min(1, { message: "Place of Birth is required!" }),
  countryresiding: zod.string().min(1, { message: "Country Residing In is required!" }),

  address: zod.string().min(1, { message: "Address is required!" }),
  city: zod.string().min(1, { message: "City is required!" }),

  zipCode: zod
    .string()
    .regex(/^\d{4,6}$/, { message: "Zip Code must be 4 to 6 digits!" })
    .min(1, { message: "Zip Code is required!" }),

  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),

  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
})

// ----------------------------------------------------------------------

export function JwtSignInViewOptions() {
  const { checkUserSession } = useAuthContext()

  const router = useRouter()

  const password = useBoolean()

  const [errorMsg, setErrorMsg] = useState("")

  const defaultValues = {
    firstName: "Hello",
    lastName: "Friend",
    email: "hello@gmail.com",
    password: "@demo1",
  }

  const methods = useForm({
    resolver: zodResolver(SignUpSchemaTemp2),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        nationality: data.nationality,
        placeOfBirth: data.placeofbirth,
        countryResiding: data.countryresiding,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        contactNumber: data.phonenumber,
      })

      await checkUserSession?.()

      router.refresh()
    } catch (error) {
      console.error(error)
      setErrorMsg(typeof error === "string" ? error : error.message)
    }
  })

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Link component={RouterLink} href={paths.auth.jwt.signInEmail} variant="subtitle2">
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Create account..."
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>Login With Email</span>
            <Icon icon="mdi:globe" />
          </Box>
        </LoadingButton>
      </Link>

      <Divider sx={{ my: 3 }}>OR</Divider>

      {/* Login With BankID (Sweden) */}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "2px solid #1976D2",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            borderColor: "#1565C0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Login With BankID</span>
          <Icon icon="twemoji:flag-sweden" />
        </Box>
      </LoadingButton>

      {/* Login With MitID (Norway) */}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "2px solid #1976D2",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            borderColor: "#1565C0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Login With MitID</span>
          <Icon icon="twemoji:flag-denmark" />
        </Box>
      </LoadingButton>

      {/* Login With BankID (Norway) */}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "2px solid #1976D2",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            borderColor: "#1565C0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Login With BankID </span>
          <Icon icon="twemoji:flag-norway" />
        </Box>
      </LoadingButton>

      {/* Login With eID (Finland) */}
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "2px solid #1976D2",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            borderColor: "#1565C0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Login With eID </span>
          <Icon icon="twemoji:flag-finland" />
        </Box>
      </LoadingButton>
    </Box>
  )

  return (
    <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 480, md: 960, lg: 1280 }, // Increased from { xs: "100%", sm: 400, md: 900, lg:1200 }
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {/* Form Header */}
        <FormHead
          title="Get started absolutely free"
          description={
            <>
              {`Create an account? `}
              <Link component={RouterLink} href={paths.presignup} variant="subtitle2">
                Get started
              </Link>
            </>
          }
          sx={{ textAlign: "center", mb: 3 }}
        />

        {/* Error Message */}
        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}

        {/* Form */}
        <Form methods={methods} onSubmit={onSubmit}>
          {renderForm}
        </Form>

        {/* Terms Component */}
        <Box sx={{ mt: 3 }}>
          <SignUpTerms />
        </Box>
      </Paper>
    </Box>
  )
}

