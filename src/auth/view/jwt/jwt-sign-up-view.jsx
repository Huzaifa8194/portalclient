import { z as zod } from "zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import LoadingButton from "@mui/lab/LoadingButton"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"

import { paths } from "src/routes/paths"
import { useRouter } from "src/routes/hooks"
import { RouterLink } from "src/routes/components"

import { useBoolean } from "src/hooks/use-boolean"

import { Iconify } from "src/components/iconify"
import { Form, Field } from "src/components/hook-form"

import { signUp } from "../../context/jwt"
import { useAuthContext } from "../../hooks"
import { FormHead } from "../../components/form-head"
import { SignUpTerms } from "../../components/sign-up-terms"

// ----------------------------------------------------------------------

export const SignUpSchema = zod
  .object({
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
    postalCode: zod.string().min(1, { message: "PostalCode is required!" }),

    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),
    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    password_confirmation: zod.string().min(1, { message: "Confirm Password is required!" }),
    phonenumber: zod
      .string()
      .min(1, { message: "Phone number is required!" })
      .regex(/^\+\d{7,14}$/, { message: "Phone number must start with + and be followed by 7 to 14 digits" }),
      
    gender: zod.string().refine((value) => value !== "Choose Option" && value !== "", {
      message: "Please select a gender",
    }),
    is_term_accepted: zod.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),

  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext()

  const router = useRouter()

  const password = useBoolean()
  const passwordConfirmation = useBoolean()

  const [errorMsg, setErrorMsg] = useState("")
  const [genderOptions, setGenderOptions] = useState([{ value: "Choose Option", label: "Choose Option" }])
  const [isLoadingGenders, setIsLoadingGenders] = useState(true)

  useEffect(() => {
    const fetchGenderOptions = async () => {
      try {
        const response = await fetch("https://api.swedenrelocators.se/api/miscellaneous/gender")
        const result = await response.json()
        console.log(result)
        if (result.data) {
          const formattedOptions = [
            { value: "Choose Option", label: "Choose Option" },
            ...result.data.map((gender) => ({
              value: gender.id,
              label: gender.name,
            })),
          ]
          setGenderOptions(formattedOptions)
          console.log(formattedOptions)
        } else {
          console.error("Unexpected API response structure:", result)
          setErrorMsg("Failed to load gender options: Invalid response format")
        }
      } catch (error) {
        console.error("Error fetching gender options:", error)
        setErrorMsg("Failed to load gender options")
      } finally {
        setIsLoadingGenders(false)
      }
    }

    fetchGenderOptions()
  }, [])

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    dateOfBirth: "",
    nationality: "",
    placeofbirth: "",
    countryresiding: "",
    address: "",
    postalCode:"",
    city: "",
    phonenumber: "",
    gender: "Choose Option",
    is_term_accepted: false,
  }

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        dob: data.dateOfBirth,
        nationality: data.nationality,
        place_of_birth: data.placeofbirth,
        currently_residing: data.countryresiding,
        address: data.address,
        contact_number: data.phonenumber,
        city: data.city,
        postal: data.postalCode,
        gender: data.gender === "Choose Option" ? "" : data.gender.toString(),
        is_term_accepted: data.is_term_accepted ? 1 : 0,
      }

      console.log("Submitting form data:", formData) // For debugging

      await signUp(formData)
      await checkUserSession?.()
      router.refresh()
    } catch (error) {
      console.error("Submission error:", error)
      setErrorMsg(typeof error === "string" ? error : error.message || "An error occurred during sign up")
    }
  })

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: "column", sm: "row" }}>
        <Field.Text name="firstName" label="First name" />
        <Field.Text name="lastName" label="Last name" />
      </Box>

      <Field.Text name="email" label="Email" />
      <Field.Text
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Field.Text
        name="password_confirmation"
        label="Confirm Password"
        type={passwordConfirmation.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={passwordConfirmation.onToggle} edge="end">
                <Iconify icon={passwordConfirmation.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Field.Text name="postalCode" label="Postal Code" />

      <Field.Text
        name="phonenumber"
        label="Phone number"
        placeholder="+1234567890"
        helperText="Must start with + followed by 7-14 digits"
      />

      <Field.DatePicker name="dateOfBirth" label="Date of birth" />
      <Field.CountrySelect name="nationality" label="Nationality" />

      <Field.CountrySelect name="placeofbirth" label="Place of Birth" />
      <Field.CountrySelect name="countryresiding" label="Country Residing In" />

      <Field.Select name="gender" label="Gender" select defaultValue="" disabled={isLoadingGenders}>
        <MenuItem value="">Choose Option</MenuItem>
        {genderOptions.map((option) => (
          <MenuItem key={option.value} value={option.value.toString()}>
            {option.label}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Text name="address" label="Address" />
      <Field.Text name="city" label="City" />

      <Field.Checkbox name="is_term_accepted" label="I accept the terms and conditions" />

      <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
        Create account
      </LoadingButton>
    </Box>
  )

  return (
    <>
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
        sx={{ textAlign: { xs: "center", md: "left" } }}
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
    </>
  )
}

