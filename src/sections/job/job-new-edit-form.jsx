"use client"

import { useMemo, useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import axios from "axios"
import { paths } from "src/routes/paths"
import { useRouter, useParams } from "src/routes/hooks"
import { FAMILY_CATEGORY_OPTIONS } from "src/_mock"
import { toast } from "src/components/snackbar"
import { Field } from "src/components/hook-form"

// Schema remains the same
const FamilyMemberSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  relationship: zod.string().min(1, { message: "Relationship is required" }),
  contact_number: zod.string().optional(),
  email: zod.string().email().optional(),
  address: zod.string().optional(),
  city: zod.string().optional(),
  postalCode: zod.string().optional(),
  country: zod.string().optional(),
  nationality: zod.string().optional(),
  place_of_birth: zod.string().optional(),
  nic: zod.string().optional(),
  passport_no: zod.string().optional(),
  dob: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  issue_date: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  expiry_date: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
})

export function JobNewEditForm({ currentJob }) {
  const router = useRouter()
  const { id } = useParams()
  const [memberData, setMemberData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch family member data
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("authToken")
        if (!token) {
          throw new Error("No authentication token found")
        }
        const response = await axios.get(`https://api.swedenrelocators.se/api/client/familyMember/show/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        setMemberData(response.data)
      } catch (error) {
        console.error("Error fetching member data:", error)
        toast.error("Failed to load member data")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMemberData()
    }
  }, [id])

  const defaultValues = useMemo(
    () => ({
      name: memberData?.data?.name || "",
      relationship: memberData?.data?.relationship || "",
      contact_number: memberData?.data?.contact_number || "",
      city: memberData?.data?.city || "",
      postalCode: memberData?.data?.postal_code || "",
      passport_no: memberData?.data?.passport_no || "",
      nic: memberData?.data?.nic || "",
      dob: memberData?.data?.dob || "",
      issue_date: memberData?.data?.issue_date || "",
      expiry_date: memberData?.data?.expiry_date || "",
      nationality: memberData?.data?.nationality || "",
      place_of_birth: memberData?.data?.place_of_birth || "",
      country: memberData?.data?.country || "",
      email: memberData?.data?.email || "",
      address: memberData?.data?.address || "",
    }),
    [memberData],
  )

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(FamilyMemberSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (memberData) {
      reset(defaultValues)
    }
  }, [memberData, defaultValues, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const apiData = new FormData()
      apiData.append("name", data.name)
      apiData.append("relationship", data.relationship)
      apiData.append("contact_number", data.contact_number || "")
      apiData.append("email", data.email || "")
      apiData.append("address", data.address || "")
      apiData.append("city", data.city || "")
      apiData.append("postal_code", data.postalCode || "")
      apiData.append("country_id", data.country || "")
      apiData.append("place_of_birth", data.place_of_birth || "")
      apiData.append("nationality", data.nationality || "")
      apiData.append("nic", data.nic || "")
      apiData.append("passport_no", data.passport_no || "")
      apiData.append("dob", data.dob || "")
      apiData.append("issue_date", data.issue_date || "")
      apiData.append("expiry_date", data.expiry_date || "")

      await axios.post(`https://api.swedenrelocators.se/api/client/familyMember/edit/${id}`, apiData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Update success!")
      router.push(paths.dashboard.job.root)
    } catch (error) {
      console.error(error?.response?.data || error)
      toast.error(error?.response?.data?.message || "Update failed. Please try again.")
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  mb: 5,
                  mx: "auto",
                  display: "block",
                  textAlign: "left",
                  color: "gray",
                }}
              >
                Update your family members information here.
              </Typography>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <Field.Text name="name" label="Full Name" />
                <Field.Select native name="relationship" label="Relationship" InputLabelProps={{ shrink: true }}>
                  {FAMILY_CATEGORY_OPTIONS.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Field.Select>
                <Field.Text name="contact_number" label="Contact Number" />
                <Field.Text name="email" label="Email address" />
                <Field.Text name="address" label="Address" />
                <Field.Text name="city" label="City" />
                <Field.Text name="postalCode" label="Postal Code" />
                <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" />
                <Field.Text name="nic" label="National Identification Number - CPR - Personnummer" />
                <Field.DatePicker name="dob" label="Date of Birth" />
                <Field.CountrySelect name="place_of_birth" label="Place of Birth" placeholder="Choose a country" />
                <Field.CountrySelect name="nationality" label="Nationality" placeholder="Choose a country" />
                <Field.Text name="passport_no" label="Passport Number" />
                <Field.DatePicker name="issue_date" label="Issue Date" />
                <Field.DatePicker name="expiry_date" label="Expiry Date" />
              </Box>
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Update Co-Applicant
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

