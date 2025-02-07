"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { isValidPhoneNumber } from "react-phone-number-input"
import Button from "@mui/material/Button"
import axios from "axios"
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
  nationality: zod.string(),
  placeOfBirth: zod.string(),
  currentlyResiding: zod.string(),
})

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("authToken")
    if (!token) {
      throw new Error("No token found. Redirecting to login.")
    }

    const response = await axios.get("https://nordicrelocators.com/api/client/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

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
    const response = await axios.get("https://nordicrelocators.com/api/miscellaneous/countries")
    return response.data.data
  } catch (error) {
    console.error("Error fetching countries:", error)
    throw error
  }
}

export function AccountGeneral() {
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
    },
  })

  const { reset } = methods

  useEffect(() => {
    async function loadData() {
      try {
        const [data, countriesList] = await Promise.all([fetchUserData(), fetchCountries()])
        setUserData(data)
        setCountries(countriesList)

        const getCountryById = (id) => {
          const country = countriesList.find((c) => c.id === id)
          return country ? { label: country.name, value: country.id.toString() } : null
        }

        reset({
          displayName: data.user?.name || "",
          email: data.user?.email || "",
          photoURL: data.profile?.profile_pic || null,
          phoneNumber: data.profile?.contact_number || "",
          country: getCountryById(data.profile?.nationality_id),
          address: data.profile?.address || "",
          dateofbirth: data.profile?.dob ? dayjs(data.profile.dob) : null,
          NID: data.profile?.nic || "",
          nationality: getCountryById(data.profile?.nationality_id) || null,
          placeOfBirth: getCountryById(data.profile?.place_of_birth_id) || null,
          currentlyResiding: getCountryById(data.profile?.currently_residing_id) || null,
        })
      } catch (error) {
        console.error(error.message)
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
    try {
      const formData = new FormData()

      formData.append("name", data.displayName)
      formData.append("email", data.email)
      formData.append("dob", data.dateofbirth ? data.dateofbirth.format("YYYY-MM-DD") : "")
      formData.append("place_of_birth", data.placeOfBirth ? data.placeOfBirth.value : "")
      formData.append("currently_residing", data.currentlyResiding ? data.currentlyResiding.value : "")
      formData.append("nationality", data.nationality ? data.nationality.value : "")
      formData.append("address", data.address)
      formData.append("secondary_address", "")
      formData.append("contact_number", data.phoneNumber)
      if (data.photoURL instanceof File) {
        formData.append("profile_pic", data.photoURL)
      }
      formData.append("nic", data.NID)
      formData.append("passport_no", "")
      formData.append("issue_date", "")
      formData.append("expiry_date", "")

      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("No authentication token found. Please log in again.")
      }

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/client/profile/edit/6`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Profile updated:", response.data)
      toast.success("Update success!")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!userData) {
    return <div>No user data available</div>
  }

  const countryOptions = countries.map((country) => ({
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
                  getOptionLabel={(option) => option.label || ""}
                />
                <Field.CountrySelect
                  name="placeOfBirth"
                  label="Place of Birth"
                  placeholder="Choose a country"
                  options={countryOptions}
                  getOptionLabel={(option) => option.label || ""}
                />
                <Field.CountrySelect
                  name="currentlyResiding"
                  label="Currently Residing"
                  placeholder="Choose a country"
                  options={countryOptions}
                  getOptionLabel={(option) => option.label || ""}
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

