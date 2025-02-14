  "use client"

  import { useState, useEffect } from "react"
  import { useNavigate } from "react-router-dom"
  import { z as zod } from "zod"
  import { useForm } from "react-hook-form"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { isValidPhoneNumber } from "react-phone-number-input"
  import Button from "@mui/material/Button"
  import axios, { endpoints } from "src/utils/axios"
  import dayjs from "dayjs"

  import { toast } from "src/components/snackbar"

  import Box from "@mui/material/Box"
  import Card from "@mui/material/Card"
  import Stack from "@mui/material/Stack"
  import Grid from "@mui/material/Unstable_Grid2"
  import Typography from "@mui/material/Typography"
  import LoadingButton from "@mui/lab/LoadingButton"

  import { fData } from "src/utils/format-number"

  import { Form, Field, schemaHelper } from "src/components/hook-form"
  import { AppWidgetSummary } from "./app-widget-summary"

  // ----------------------------------------------------------------------

  export const UpdateUserSchema = zod.object({
    displayName: zod.string().min(1, { message: "Name is required!" }),
    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),
    photoURL: schemaHelper
      .file({
        message: { required_error: "Avatar is required!" },
      })
      .optional(),
    phoneNumber: zod.string().refine((value) => !value || isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
    country: zod
      .object({
        label: zod.string(),
        value: zod.string(),
      })
      .nullable(),
    address: zod.string().min(1, { message: "Address is required!" }),
    dateofbirth: zod.any(),
    NID: zod.string().min(1, { message: "NID is required!" }),
    nationality: zod
      .object({
        label: zod.string(),
        value: zod.string().min(1, { message: "Nationality is required!" }),
      })
      .nullable(),
    placeOfBirth: zod
      .object({
        label: zod.string(),
        value: zod.string().min(1, { message: "Place of birth is required!" }),
      })
      .nullable(),
    currentlyResiding: zod
      .object({
        label: zod.string(),
        value: zod.string().min(1, { message: "Currently residing field is required!" }),
      })
      .nullable(),
    secondaryAddress: zod.string().optional(),
  })


  const fetchUserData = async () => {
    try {
      const response = await axios.get(endpoints.client.profile)
      console.log("User data:", response.data)
      return response.data.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Authentication failed. Please login again.")
      } else {
        console.error("Error fetching user data:", error)
        throw error
      }
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await axios.get(endpoints.supporting.countries)
      const validCountries = response.data.data.filter(
        (country) => country && typeof country === "object" && country.name && country.id,
      )
      return validCountries
    } catch (error) {
      console.error("Error fetching countries:", error)
      throw error
    }
  }

  export function AccountGeneral() {
    console.log("AccountGeneral component rendered")
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [countries, setCountries] = useState([])
    const navigate = useNavigate()

    const methods = useForm({
      mode: "all",
      resolver: zodResolver(UpdateUserSchema),
      defaultValues: {
        displayName: "",
        email: "",
        photoURL: null,
        phoneNumber: "",
        country: null,
        address: "",
        dateofbirth: null,
        NID: "",
        nationality: null,
        placeOfBirth: null,
        currentlyResiding: null,
        gender: "",
        secondaryAddress: "",
      },
    })

    const { reset } = methods

    useEffect(() => {
      async function loadData() {
        console.log("loadData function called")
        try {
          const [userDataResponse, countriesList] = await Promise.all([fetchUserData(), fetchCountries()])
          console.log("User data fetched:", userDataResponse)
          console.log("Countries list fetched:", countriesList)
          setUserData(userDataResponse)
          setCountries(countriesList)

          const getCountryById = (id) => {
            if (!id) return null
            const country = countriesList.find((c) => c.id === Number(id))
            return country ? { label: country.name, value: country.id.toString() } : null
          }

          reset({
            displayName: userDataResponse.user?.name || "",
            email: userDataResponse.user?.email || "",
            photoURL: userDataResponse.profile?.profile_pic || null,
            phoneNumber: userDataResponse.profile?.contact_number || "",
            country: getCountryById(userDataResponse.profile?.nationality_id),
            address: userDataResponse.profile?.address || "",
            dateofbirth: userDataResponse.profile?.dob ? dayjs(userDataResponse.profile.dob) : null,
            NID: userDataResponse.profile?.nic || "",
            nationality: getCountryById(userDataResponse.profile?.nationality_id),
            placeOfBirth: getCountryById(userDataResponse.profile?.place_of_birth_id),
            currentlyResiding: getCountryById(userDataResponse.profile?.currently_residing_id),
            gender: userDataResponse.profile?.gender || "",
            secondaryAddress: userDataResponse.profile?.secondary_address || "",
          })
        } catch (error) {
          console.error("Error in loadData:", error)
          toast.error(error.message)
          if (error.message.includes("No token found") || error.message.includes("Authentication failed")) {
            navigate("/login")
          }
        } finally {
          setIsLoading(false)
        }
      }
      loadData()
    }, [navigate, reset])

    const {
      handleSubmit,
      formState: { isSubmitting },
    } = methods

    const onSubmit = handleSubmit(async (data) => {
      console.log("Form submission started")
      try {
        const formData = new FormData()

        // Log the entire data object
        console.log("Form data before submission:", JSON.stringify(data, null, 2))

        // Ensure all required fields are included with fallbacks
        formData.append("name", data.displayName)
        formData.append("email", data.email)
        formData.append("dob", data.dateofbirth ? dayjs(data.dateofbirth).format("YYYY-MM-DD") : "")

        // Handle place of birth
        console.log("Place of Birth data:", JSON.stringify(data.placeOfBirth, null, 2))
        if (data.placeOfBirth && data.placeOfBirth.value) {
          formData.append("place_of_birth_id", data.placeOfBirth.value.toString())
        } else {
          formData.append("place_of_birth_id", "")
        }

        // Handle currently residing
        if (data.currentlyResiding && data.currentlyResiding.value) {
          formData.append("currently_residing_id", data.currentlyResiding.value.toString())
        } else {
          formData.append("currently_residing_id", "")
        }

        // Handle nationality
        if (data.nationality && data.nationality.value) {
          formData.append("nationality_id", data.nationality.value.toString())
        } else {
          formData.append("nationality_id", "")
        }

        formData.append("address", data.address || "")
        formData.append("secondary_address", data.secondaryAddress || "")
        formData.append("contact_number", data.phoneNumber || "")
        if (data.photoURL instanceof File) {
          formData.append("profile_pic", data.photoURL)
        }
        formData.append("nic", data.NID || "")
        formData.append("gender", userData.profile.gender_id ? userData.profile.gender_id.toString() : "")

        // Log form data for debugging
        Array.from(formData.entries()).forEach(([key, value]) => {
          console.log(`${key}: ${value}`)
        })

        console.log("Sending request to:", endpoints.client.editProfile)
        const response = await axios.post(endpoints.client.editProfile, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        console.log("Profile updated:", response.data)
        toast.success("Update success!")
      } catch (error) {
        console.error("Error updating profile:", error)
        if (error.response) {
          console.error("Response data:", error.response.data)
          console.error("Response status:", error.response.status)
          console.error("Response headers:", error.response.headers)
        } else if (error.request) {
          console.error("No response received:", error.request)
        } else {
          console.error("Error setting up request:", error.message)
        }
        toast.error(error.response?.data?.message || "Failed to update profile. Please check your input and try again.")
      }
    })

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!userData) {
      return <div>No user data available</div>
    }

    const countryOptions = countries
      .filter((country) => country && country.name && country.id)
      .map((country) => ({
        label: country.name,
        value: country.id.toString(),
      }))

    return (
      <>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid xs={12} md={4}>
            <AppWidgetSummary
              title="User ID:"
              codeicon={
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="#5ee943"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    color="#5ee943"
                  >
                    <path d="M8.5 18c1.813-1.954 5.167-2.046 7 0m-1.56-6c0 1.105-.871 2-1.947 2c-1.075 0-1.947-.895-1.947-2s.872-2 1.947-2s1.948.895 1.948 2" />
                    <path d="M9.5 4.002c-2.644.01-4.059.102-4.975.97C3.5 5.943 3.5 7.506 3.5 10.632v4.737c0 3.126 0 4.69 1.025 5.66c1.025.972 2.675.972 5.975.972h3c3.3 0 4.95 0 5.975-.971c1.025-.972 1.025-2.535 1.025-5.66v-4.738c0-3.126 0-4.689-1.025-5.66c-.916-.868-2.33-.96-4.975-.97" />
                    <path d="M9.772 3.632c.096-.415.144-.623.236-.792a1.64 1.64 0 0 1 1.083-.793C11.294 2 11.53 2 12 2s.706 0 .909.047a1.64 1.64 0 0 1 1.083.793c.092.17.14.377.236.792l.083.36c.17.735.255 1.103.127 1.386a1.03 1.03 0 0 1-.407.451C13.75 6 13.332 6 12.498 6h-.996c-.834 0-1.252 0-1.533-.17a1.03 1.03 0 0 1-.407-.452c-.128-.283-.043-.65.127-1.386z" />
                  </g>
                </svg>
              }
              total={userData.profile.user_type_id || "N/A"}
              extratext="Unique Identifier"
              chart={{
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                series: [15, 18, 12, 51, 68, 11, 39, 37],
              }}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <AppWidgetSummary
              title="User Type"
              extratext="Basic User."
              total={userData.profile.user_type || "N/A"}
              codeicon={
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                  <path
                    fill="#5ee943"
                    d="M14.94 19.5L12 17.77L9.06 19.5l.78-3.34l-2.59-2.24l3.41-.29L12 10.5l1.34 3.13l3.41.29l-2.59 2.24M20 2H4v2l4.86 3.64a8 8 0 1 0 6.28 0L20 4m-2 11a6 6 0 1 1-7.18-5.88a5.9 5.9 0 0 1 2.36 0A6 6 0 0 1 18 15m-5.37-8h-1.26l-4-3h9.34Z"
                  />
                </svg>
              }
              chart={{
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                series: [20, 41, 63, 33, 28, 35, 50, 46],
              }}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <AppWidgetSummary
              title="Day registered"
              codeicon={
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path
                    fill="#5ee943"
                    d="M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z"
                  />
                  <path
                    fill="#5ee943"
                    d="M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5"
                  />
                </svg>
              }
              total={userData.user.created_at ? dayjs(userData.user.created_at).format("YYYY-MM-DD") : "N/A"}
              extratext={`Joined on ${userData.user.created_at ? dayjs(userData.user.created_at).format("YYYY-MM-DD") : "N/A"}`}
              chart={{
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                series: [18, 19, 31, 8, 16, 37, 12, 33],
              }}
            />
          </Grid>
        </Grid>
        <Form methods={methods} sx={{ mt: 10 }} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card
                sx={{
                  pt: 10,
                  pb: 5,
                  px: 3,
                  textAlign: "center",
                }}
              >
                <Field.UploadAvatar
                  name="photoURL"
                  maxSize={3145728}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.disabled",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <Button variant="soft" color="success" sx={{ mt: 3, mr: 1 }}>
                  Update password
                </Button>
                <Button variant="soft" color="error" sx={{ mt: 3 }}>
                  Delete user
                </Button>
              </Card>
            </Grid>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  <Field.Text name="displayName" label="Name" />
                  <Field.Text name="email" label="Email address" />
                  <Field.DatePicker name="dateofbirth" label="Date of Birth" />
                  <Field.Text name="NID" label="National Identification Number - CPR - Personnummer" />
                  <Field.CountrySelect
                    name="nationality"
                    label="Nationality"
                    placeholder="Choose a country"
                    options={countryOptions}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value || option.value === value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                  />
                  <Field.CountrySelect
                    name="placeOfBirth"
                    label="Place of Birth"
                    placeholder="Choose a country"
                    options={countryOptions}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value || option.value === value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                  />
                  <Field.CountrySelect
                    name="currentlyResiding"
                    label="Currently Residing"
                    placeholder="Choose a country"
                    options={countryOptions}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value || option.value === value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                  />
                  <Field.Text name="address" label="Address" />
                  <Field.Phone name="phoneNumber" label="Contact Number" />
                </Box>
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Save changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </>
    )
  }

  export default AccountGeneral

