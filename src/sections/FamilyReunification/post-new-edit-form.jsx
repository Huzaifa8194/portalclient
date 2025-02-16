"use client"

import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useEffect, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { toast } from "src/components/snackbar"

import { Form, Field } from "src/components/hook-form"
import axios, { endpoints } from "src/utils/axios"

// Yes/No options array
const YES_NO_OPTIONS = [
  { value: "", label: "Choose an Option" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

const FormSchema = zod.object({
  isEuCitizen: zod.string().min(1, { message: "Please select if you are an EU Citizen" }),
  citizenship: zod.string().optional(),
  permanentResidence: zod.string().optional(),
  plannedMove: zod.string().optional(),
  personnummer: zod.string().min(1, { message: "Please select if you have a valid Personnummer" }),
  personnummerRejected: zod.string().min(1, { message: "Please select if your Personnummer was rejected" }),
  apartment: zod.string().min(1, { message: "Please select your apartment status" }),
  permanentStay: zod.string().min(1, { message: "Please select if you plan to stay permanently" }),
  fullTimeWork: zod.string().min(1, { message: "Please select your work status" }),
  familyVisa: zod.string().min(1, { message: "Please select your family visa status" }),
  moveAlone: zod.boolean(),
})

export default function PostNewEditForm() {
  const defaultValues = useMemo(
    () => ({
      isEuCitizen: "",
      citizenship: "",
      permanentResidence: "",
      plannedMove: "",
      personnummer: "",
      personnummerRejected: "",
      apartment: "",
      permanentStay: "",
      fullTimeWork: "",
      familyVisa: "",
      moveAlone: false,
    }),
    [],
  )

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods

  const isEuCitizen = watch("isEuCitizen")

  const onSubmit = handleSubmit(async (data) => {
    try {
      
      console.log("Raw Form Data:", {
        isEuCitizen: data.isEuCitizen,
        citizenship: data.citizenship,
        permanentResidence: data.permanentResidence,
        plannedMove: data.plannedMove,
        personnummer: data.personnummer,
        personnummerRejected: data.personnummerRejected,
        apartment: data.apartment,
        permanentStay: data.permanentStay,
        fullTimeWork: data.fullTimeWork,
        familyVisa: data.familyVisa,
        moveAlone: data.moveAlone,
      })

      
      const submissionData = {
        eu_citizen: data.isEuCitizen, 
        citizenship_country: data.citizenship,
        permanent_residence_permit_country: data.permanentResidence,
        planned_move: data.plannedMove,
        personnummerin_sweden: data.personnummer,
        applied_personnumer_and_rejected: data.personnummerRejected,
        own_apartment_or_rental: data.apartment,
        planning_to_stay_permanently: data.permanentStay,
        full_time_work_in_sweden: data.fullTimeWork,
        applied_family_visa_and_rejected: data.familyVisa,
        move_alone: data.moveAlone,
        visitor_name: userData?.user?.name || "",
        visitor_email: userData?.user?.email || "",
        visitor_contact_no: userData?.profile?.contact_number || "",
      }

      // Log the transformed data before submission
      console.log("Data being sent to API:", submissionData)

      // Make the API call
      const response = await axios.post(endpoints.assessments.familyreunification, submissionData)

      // Log the API response
      console.log("API Response:", response.data)
      toast.success("Assessment submitted successfully!")
    } catch (error) {
      console.error("Error submitting assessment:", error.response?.data || error)
      toast.error(error.response?.data?.message || "Failed to submit assessment. Please try again.")
    }
  })

  const [countries, setCountries] = useState([])
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(endpoints.countries.countrylist)
        const validCountries = response.data.data.filter(
          (country) => country && typeof country === "object" && country.name && country.id,
        )
        setCountries(validCountries)
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(endpoints.client.profile)
        setUserData(response.data.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast.error("Failed to load user data")
      }
    }

    fetchUserData()
  }, [])

  const renderFormFields = () => {
    if (isEuCitizen === "yes") {
      return (
        <>
          <Field.Select
            native
            name="plannedMove"
            label="Are you already moved to Sweden or planning to move in coming 90 Days Period?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: "1 / -1" }}
            required
          >
            {YES_NO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field.Select>
        </>
      )
    }

    if (isEuCitizen === "no") {
      return (
        <>
          <Field.Select
            native
            name="citizenship"
            label="Which Citizenship you have?"
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id.toString()}>
                {country.name}
              </option>
            ))}
          </Field.Select>
          <Field.Select
            native
            name="permanentResidence"
            label="Do you have permanent Residence permit from below mentioned countries?"
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: "1 / -1" }}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id.toString()}>
                {country.name}
              </option>
            ))}
          </Field.Select>
        </>
      )
    }

    return null
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 4, borderRadius: 1 }}>
              Relocate to Sweden
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
              sx={{
                "& .MuiFormControl-root": {
                  width: "100%",
                },
                "& .MuiInputBase-root": {
                  minHeight: "56px",
                },
              }}
            >
              <Field.Select
                native
                name="isEuCitizen"
                label="Are you EU Citizen?"
                InputLabelProps={{ shrink: true }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              {renderFormFields()}

              <Field.Select
                native
                name="personnummer"
                label="Do you have valid Personnummer in Sweden?"
                InputLabelProps={{ shrink: true }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select
                native
                name="personnummerRejected"
                label="Did you applied for Personnummer and got rejected?"
                InputLabelProps={{ shrink: true }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select
                native
                name="apartment"
                label="Do you have your own Apartment in Sweden OR do you have first hand rental apartment?"
                InputLabelProps={{ shrink: true }}
                sx={{ gridColumn: "1 / -1" }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select
                native
                name="permanentStay"
                label="Are you planning to stay permanently in Sweden?"
                InputLabelProps={{ shrink: true }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select
                native
                name="fullTimeWork"
                label="Do you have full time work in Sweden or Denmark?"
                InputLabelProps={{ shrink: true }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select
                native
                name="familyVisa"
                label="Did you applied for your family visa and got rejected?"
                InputLabelProps={{ shrink: true }}
                required
              >
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Typography
                variant="h6"
                sx={{
                  gridColumn: "1 / -1",
                  mt: 3,
                  borderRadius: 1,
                }}
              >
                Familiy Document Assessment
              </Typography>

              <FormControlLabel
                control={<Checkbox name="moveAlone" />}
                label="I am single or I want to move by myself first"
                sx={{ gridColumn: "1 / -1" }}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit Form
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

