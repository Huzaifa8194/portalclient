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
import { useRouter } from "src/routes/hooks"

import { useBoolean } from "src/hooks/use-boolean"

import {
  APPOINTMENT_TYPE_OPTIONS,
  APPOINTMENT_CATEGORY_OPTIONS,
  APPOINTMENT_COUNTRY_OPTIONS,
  APPOINTMENT_TIME_OPTIONS,
} from "src/_mock"

import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"

// ----------------------------------------------------------------------

export const NewPostSchema = zod.object({
  category: zod.string().min(1, { message: "Appointment Type is required!" }),
  category2: zod.string().min(1, { message: "Appointment Category is required!" }),
  category3: zod.string().min(1, { message: "Appointment Country is required!" }),
  dateofbirth: zod.date({ required_error: "Appointment Date is required!" }),
  description: zod.string().min(1, { message: "Appointment Description is required!" }),
  promocode: zod.string().optional(),
  agreement: zod.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const router = useRouter()
  const preview = useBoolean()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const defaultValues = useMemo(
    () => ({
      category: currentPost?.category || "",
      category2: currentPost?.category2 || "",
      category3: currentPost?.category3 || "",
      dateofbirth: currentPost?.dateofbirth || null,
      description: currentPost?.description || "",
      promocode: currentPost?.promocode || "",
      agreement: currentPost?.agreement || false,
    }),
    [currentPost],
  )

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    getValues,
    setError,
    clearErrors,
  } = methods

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues)
    }
  }, [currentPost, defaultValues, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setFormSubmitted(true)
      toast.success(currentPost ? "Update success!" : "Create success!")
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.")
    }
  })

  const handleApplyPromoCode = () => {
    const promoCode = getValues("promocode")
    if (promoCode) {
      // Add your logic for applying the promo code here
      toast.success(`Promo code "${promoCode}" applied successfully!`)
    } else {
      toast.error("Please enter a promo code.")
    }
  }

  const handleAddCoApplicant = () => {
    const formData = getValues()
    const emptyFields = Object.keys(NewPostSchema.shape).filter((key) => key !== "promocode" && !formData[key])

    if (emptyFields.length === 0) {
      console.log("Co-Applicant Details:", formData)
      toast.success("Co-Applicant added successfully!")
      // Add your logic for adding a co-applicant here
    } else {
      // Clear any existing errors
      clearErrors()

      // Set errors for empty fields
      emptyFields.forEach((field) => {
        setError(field, {
          type: "manual",
          message: "This field is required",
        })
      })

      // Show a single toast message
      toast.error("Please fill in all required fields.")
    }
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
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
              You can book your appointments under this section and the free appointment cant be rescheduled. The first
              free appointment is available for Swedish Students & EU citizens except Swedish citizens.
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
              <Field.Select native name="category" label="Appointment Type" InputLabelProps={{ shrink: true }}>
                {APPOINTMENT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="category2" label="Appointment Category" InputLabelProps={{ shrink: true }}>
                {APPOINTMENT_CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="category3" label="Appointment Country" InputLabelProps={{ shrink: true }}>
                {APPOINTMENT_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.DatePicker name="dateofbirth" label="Appointment Date (First you have to select country)" />

              <Field.Select native name="category3" label="Appointment Time" InputLabelProps={{ shrink: true }}>
                {APPOINTMENT_TIME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.Text name="description" label="Appointment Description" />
            </Box>

            <Stack spacing={3} sx={{ mt: 1.5 }}>
              <Field.Text name="promocode" label="Do you have a Promo Code" />
            </Stack>

            <Stack spacing={3} sx={{ mt: 1.5 }}>
              <Field.Checkbox name="agreement" label="I agree to the Appointment Terms & Conditions" sx={{ mt: 3 }} />
            </Stack>

            <Stack spacing={3} direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
              <LoadingButton onClick={handleApplyPromoCode} variant="contained" loading={isSubmitting}>
                Add Promo Code
              </LoadingButton>

              <LoadingButton onClick={handleAddCoApplicant} variant="contained" loading={isSubmitting}>
                Add Co-Applicant
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

