import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"


import { Form, Field } from "src/components/hook-form"

// ----------------------------------------------------------------------

const ClientContactInfoSchema = zod.object({
  applicantType: zod.string().min(1, { message: "Applicant type is required" }),
  fullName: zod.string().min(1, { message: "Full name is required" }),
  dateOfBirth: zod.string().min(1, { message: "Date of birth is required" }),
  gender: zod.string().min(1, { message: "Gender is required" }),
  nationalId: zod.string().min(1, { message: "National ID/Passport Number is required" }),
  contactNumber: zod.string().min(1, { message: "Contact number is required" }),
  email: zod.string().email({ message: "Invalid email address" }),
  address: zod.string().min(1, { message: "Address is required" }),
  occupation: zod.string().min(1, { message: "Occupation is required" }),
})

// ----------------------------------------------------------------------

export function ClientContactInfo({ formData, handleInputChange }) {
  const defaultValues = {
    applicantType: formData.applicantType || "",
    fullName: formData.fullName || "",
    dateOfBirth: formData.dateOfBirth || "",
    gender: formData.gender || "",
    nationalId: formData.nationalId || "",
    contactNumber: formData.contactNumber || "",
    email: formData.email || "",
    address: formData.address || "",
    occupation: formData.occupation || "",
  }

  const methods = useForm({
    resolver: zodResolver(ClientContactInfoSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods

  const applicantType = watch("applicantType")

  useEffect(() => {
    handleInputChange({ target: { name: "applicantType", value: applicantType } })
  }, [applicantType, handleInputChange])

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Handle form submission
      console.log("Form data:", data)
    } catch (error) {
      console.error("Submission error:", error)
    }
  })

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box gap={3} display="flex" flexDirection="column">
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom >
            Client Information
          </Typography>
        </Grid>
          <Grid item xs={12}>
            <Field.Select
              name="applicantType"
              label="Who is this for?"
              fullWidth
              onChange={(e) => setValue("applicantType", e.target.value)}
            >
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="myself">Myself</MenuItem>
              <MenuItem value="family">My Family</MenuItem>
              <MenuItem value="other">Other Person</MenuItem>
            </Field.Select>
          </Grid>

          {applicantType === "other" && (
            <>
              <Grid item xs={12}>
                <Field.Text name="fullName" label="Full Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field.DatePicker name="dateOfBirth" label="Date of birth" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field.Select name="gender" label="Gender" fullWidth>
                  <MenuItem value="">Select gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Field.Select>
              </Grid>
              <Grid item xs={12}>
                <Field.Text name="nationalId" label="National ID/Passport Number" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field.Text name="contactNumber" label="Contact Number" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field.Text name="email" label="Email Address" type="email" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Field.Text name="address" label="Residential Address" multiline rows={3} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Field.Text name="occupation" label="Occupation" fullWidth />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Form>
  )
}