"use client"

import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useEffect, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import axios, { endpoints } from "src/utils/axios"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import { useRouter } from "src/routes/hooks"

import { useBoolean } from "src/hooks/use-boolean"

import { APPOINTMENT_COUNTRY_OPTIONS } from "src/_mock"

import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"

// ----------------------------------------------------------------------

export const NewPostSchema = zod.object({
  category: zod.string().min(1, { message: "Appointment Type is required!" }),
  category2: zod.string().min(1, { message: "Appointment Category is required!" }),
  category3: zod.string().min(1, { message: "Appointment Country is required!" }),
  dateofbirth: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Date of birth must be a valid date!" }),
  category4: zod.string().min(1, { message: "Appointment Time is required!" }),
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
  const [appointmentTypes, setAppointmentTypes] = useState([])
  const [appointmentCategories, setAppointmentCategories] = useState([])
  const [appointmentTimeSlots, setAppointmentTimeSlots] = useState([])

  const defaultValues = useMemo(
    () => ({
      category: currentPost?.category || "",
      category2: currentPost?.category2 || "",
      category3: currentPost?.category3 || "",
      dateofbirth: currentPost?.dateofbirth || "",
      category4: currentPost?.category4 || "",
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
    setValue,
  } = methods

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues)
    }
  }, [currentPost, defaultValues, reset])

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const [typeResponse, categoriesResponse, timeslotResponse] = await Promise.all([
          axios.get(endpoints.appointment.type),
          axios.get(endpoints.appointment.categories),
          axios.get(endpoints.appointment.timeslot),
        ])

        console.log("Appointment Types:", typeResponse.data)
        console.log("Appointment Categories:", categoriesResponse.data)
        console.log("Appointment Time Slots:", timeslotResponse.data.data)

        setAppointmentTypes(typeResponse.data.data || [])
        setAppointmentCategories(categoriesResponse.data.data || [])

        // Ensure we're setting the correct structure for time slots
        const timeSlots = timeslotResponse.data.data || []
        console.log("Time slots before setting state:", timeSlots)
        setAppointmentTimeSlots(timeSlots)
      } catch (error) {
        console.error("Error fetching appointment data:", error)
        toast.error("Failed to load some appointment options. Please try again.")
      }
    }

    fetchAppointmentData()
  }, [])

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
      toast.success(`Promo code "${promoCode}" applied successfully!`)
    } else {
      toast.error("Please enter a promo code.")
    }
  }

  const handleBookAppointment = async () => {
    const formData = getValues()
    const requiredFields = [
      "category",
      "category2",
      "category3",
      "dateofbirth",
      "category4",
      "description",
      "agreement",
    ]
    const emptyFields = requiredFields.filter((field) => !formData[field])

    if (emptyFields.length === 0) {
      try {
        const appointmentData = {
          type_id: formData.category,
          language_id: 1, // Adding default language_id
          category_id: formData.category2,
          country: formData.category3,
          appointment_date: formData.dateofbirth,
          time_slot_id: formData.category4,
          description: formData.description,
          is_coupon: formData.promocode ? 1 : 0,
          net_total_amount: 0, // You need to calculate this based on your business logic
          total_amount: 0, // You need to calculate this based on your business logic
          transaction_id: "PENDING", // You may need to generate this or get it from somewhere
          vat: 0, // You need to calculate this based on your business logic
        }

        console.log("Appointment data being sent:", appointmentData)
        const response = await axios.post(endpoints.appointment.book, appointmentData)
        console.log("Appointment booked:", response.data)
        toast.success("Appointment booked successfully!")
      } catch (error) {
        console.error("Error booking appointment:", error.response?.data || error)
        toast.error(error.response?.data?.message || "Failed to book appointment. Please try again.")
      }
    } else {
      clearErrors()
      emptyFields.forEach((field) => {
        setError(field, {
          type: "manual",
          message: "This field is required",
        })
      })
      toast.error("Please fill in all required fields.")
    }
  }

  // Note: You'll need to implement logic to calculate net_total_amount, total_amount, and vat
  // based on your business requirements. These values are currently set to 0.

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
                <option value="">Select Appointment Type</option>
                {appointmentTypes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="category2" label="Appointment Category" InputLabelProps={{ shrink: true }}>
                <option value="">Select Appointment Category</option>
                {appointmentCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="category3" label="Appointment Country" InputLabelProps={{ shrink: true }}>
                <option value="">Select Appointment Country</option>
                {APPOINTMENT_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.DatePicker
                name="dateofbirth"
                label="Appointment Date"
                inputFormat="yyyy-MM-dd"
                onChange={(date) => setValue("dateofbirth", date.toISOString().split("T")[0])}
              />

              <Field.Select native name="category4" label="Appointment Time" InputLabelProps={{ shrink: true }}>
                <option value="">Select Appointment Time</option>
                {appointmentTimeSlots.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.time_range}
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

              <LoadingButton onClick={handleBookAppointment} variant="contained" loading={isSubmitting}>
                Book an Appointment
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}

