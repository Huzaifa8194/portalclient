"use client"

import { useMemo, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import { paths } from "src/routes/paths"
import { useRouter, useParams } from "src/routes/hooks"
import { FAMILY_CATEGORY_OPTIONS } from "src/_mock"
import { toast } from "src/components/snackbar"
import { Field } from "src/components/hook-form"

const FamilyMemberSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  relationship: zod.string().min(1, { message: "Relationship is required" }),
  passport_no: zod.string().optional(),
  nic: zod.string().optional(),
  dob: zod
  .string()
  .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),  
  issue_date: zod
  .string()
  .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  expiry_date: zod
  .string()
  .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  nationality: zod.string().optional(),
  place_of_birth: zod.string().optional(),
  contact_number: zod.string().optional(),
  email: zod.string().email().optional(),
  address: zod.string().optional(),
})

export function JobNewEditForm({ currentJob }) {
  const router = useRouter()
  const { id } = useParams()
  const defaultValues = useMemo(
    () => ({
      name: currentJob?.name || "",
      relationship: currentJob?.relationship || "",
      passport_no: currentJob?.passport_no || "",
      nic: currentJob?.nic || "",
      dob: currentJob?.dob ? new Date(currentJob.dob) : null,
      issue_date: currentJob?.issue_date ? new Date(currentJob.issue_date) : null,
      expiry_date: currentJob?.expiry_date ? new Date(currentJob.expiry_date) : null,
      nationality: currentJob?.nationality ? String(currentJob.nationality) : "",
      place_of_birth: currentJob?.place_of_birth ? String(currentJob.place_of_birth) : "",
      contact_number: currentJob?.contact_number || "",
      email: currentJob?.email || "",
      address: currentJob?.address || "",
    }),
    [currentJob],
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
    if (currentJob) {
      reset(defaultValues)
    }
  }, [currentJob, defaultValues, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Prepare the data for the API request
      const apiData = {
        name: data.name,
        relationship: data.relationship,
        contact_number: data.contact_number,
        email: data.email,
        address: data.address,
        nic: data.nic,
        passport_no: data.passport_no,
        dob: data.dob,
        
        place_of_birth: data.place_of_birth,
        nationality: data.nationality,
        issue_date: data.issue_date,
        expiry_date: data.expiry_date,
      }

      // Send POST request to the API
      const response = await fetch(`https://api.swedenrelocators.se/api/client/familyMember/edit/${id}`, {
        method: "POST",
        headers: {

          "Content-Type": "application/json",
          // Add any necessary authentication headers here
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        throw new Error("Failed to update client information")
      }

      toast.success("Update success!")
      router.push(paths.dashboard.job.root)
    } catch (error) {
      console.error(error)
      toast.error("Update failed. Please try again.")
    }
  })

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
                <Field.Text name="passport_no" label="Passport Number" />
                <Field.Text name="nic" label="National Identification Number - CPR - Personnummer" />
                <Field.DatePicker name="dob" label="Date of Birth" />
                <Field.DatePicker name="issue_date" label="Issue Date" />
                <Field.DatePicker name="expiry_date" label="Expiry Date" />
                <Field.CountrySelect name="nationality" label="Nationality" placeholder="Choose a country" />
                <Field.CountrySelect name="place_of_birth" label="Place of Birth" placeholder="Choose a country" />
                <Field.Text name="contact_number" label="Contact Number" />
                <Field.Text name="email" label="Email address" />
                <Field.Text name="address" label="Address" />
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

