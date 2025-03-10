"use client"

import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useEffect, useState, useCallback } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import axios from "axios"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import LoadingButton from "@mui/lab/LoadingButton"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"

import { toast } from "src/components/snackbar"
import { Form, Field } from "src/components/hook-form"
import { useAuthContext } from "src/auth/hooks"

// ----------------------------------------------------------------------

// Country options - typically these would come from an API
const APPOINTMENT_COUNTRY_OPTIONS = [
  { value: "Sweden", label: "Sweden" },
  { value: "Norway", label: "Norway" },
  { value: "Denmark", label: "Denmark" },
  { value: "Finland", label: "Finland" },
  { value: "Iceland", label: "Iceland" },
  { value: "Other", label: "Other" },
]

// Language options - typically these would come from an API
const LANGUAGE_OPTIONS = [
  { id: 1, name: "English" },
  { id: 2, name: "Swedish" },
  { id: 3, name: "Norwegian" },
  { id: 4, name: "Danish" },
  { id: 5, name: "Finnish" },
]

export const RescheduleSchema = zod.object({
  type_id: zod.string().min(1, { message: "Appointment Type is required!" }),
  category_id: zod.string().min(1, { message: "Appointment Category is required!" }),
  appointment_date: zod
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: "Appointment date must be a valid date!" })
    .refine(
      (date) => {
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate >= today
      },
      { message: "Appointment date must be today or in the future!" },
    ),
  country: zod.string().min(1, { message: "Country is required!" }),
  time_slot_id: zod.string().min(1, { message: "Appointment Time is required!" }),
  description: zod.string().min(1, { message: "Description is required!" }),
  language_id: zod.string().min(1, { message: "Language is required!" }),
  agreement: zod.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

// ----------------------------------------------------------------------

export function RescheduleAppointmentForm({ appointment, onClose, onSuccess }) {
  const [appointmentTimeSlots, setAppointmentTimeSlots] = useState([])
  const [appointmentTypes, setAppointmentTypes] = useState([])
  const [appointmentCategories, setAppointmentCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [canReschedule, setCanReschedule] = useState(true)
  const [rescheduleError, setRescheduleError] = useState("")
  const { user } = useAuthContext()

  const defaultValues = useMemo(
    () => ({
      type_id: appointment?.type_id?.toString() || "",
      category_id: appointment?.category_id?.toString() || "",
      appointment_date: appointment?.appointment_date || "",
      country: appointment?.country || "",
      time_slot_id: appointment?.time_slot_id?.toString() || "",
      description: appointment?.description || "",
      language_id: appointment?.language_id?.toString() || "1", // Default to English (1) if not available
      agreement: false,
    }),
    [appointment],
  )

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(RescheduleSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods

  // Extract the check eligibility function to avoid dependency issues
  const checkRescheduleEligibility = useCallback(
    (slots) => {
      if (!appointment) return

      // Check if appointment was booked with promo code
      if (appointment.is_coupon === 1) {
        setCanReschedule(false)
        setRescheduleError("Appointments booked through promo code cannot be rescheduled.")
        return
      }

      // Check if appointment has already been rescheduled
      if (appointment.is_rescheduled === 1) {
        setCanReschedule(false)
        setRescheduleError("This appointment has already been rescheduled once and cannot be rescheduled again.")
        return
      }

      // Check if appointment is within 24 hours
      const appointmentDate = new Date(appointment.appointment_date)
      const appointmentTime = slots.find((slot) => slot.id === Number(appointment.time_slot_id))?.time_range

      if (appointmentTime) {
        const [startTime] = appointmentTime.split(" - ")
        const [hours, minutes] = startTime.split(":").map(Number)
        appointmentDate.setHours(hours, minutes, 0, 0)

        const now = new Date()
        const timeDiff = appointmentDate.getTime() - now.getTime()
        const hoursDiff = timeDiff / (1000 * 60 * 60)

        if (hoursDiff < 24) {
          setCanReschedule(false)
          setRescheduleError("Appointments cannot be rescheduled less than 24 hours before the scheduled time.")
          return
        }
      }

      setCanReschedule(true)
      setRescheduleError("")
    },
    [appointment],
  )

  useEffect(() => {
    if (appointment) {
      reset(defaultValues)

      // Fetch all necessary data for the form
      const fetchAppointmentData = async () => {
        try {
          setLoading(true)
          const [timeslotResponse, typeResponse, categoriesResponse] = await Promise.all([
            axios.get("https://api.swedenrelocators.se/api/miscellaneous/appointmentTimeSlots"),
            axios.get("https://api.swedenrelocators.se/api/miscellaneous/appointmentTypes"),
            axios.get("https://api.swedenrelocators.se/api/miscellaneous/appointmentCategories"),
          ])

          setAppointmentTimeSlots(timeslotResponse.data.data || [])
          setAppointmentTypes(typeResponse.data.data || [])
          setAppointmentCategories(categoriesResponse.data.data || [])

          checkRescheduleEligibility(timeslotResponse.data.data || [])
        } catch (error) {
          console.error("Error fetching appointment data:", error)
          toast.error("Failed to load appointment options. Please try again.")
        } finally {
          setLoading(false)
        }
      }

      fetchAppointmentData()
    }
  }, [appointment, defaultValues, reset, checkRescheduleEligibility])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!canReschedule) {
        toast.error(rescheduleError)
        return
      }

      // Prepare data for rescheduling with all required fields
      const rescheduleData = {
        type_id: data.type_id,
        category_id: data.category_id,
        appointment_date: data.appointment_date,
        country: data.country,
        time_slot_id: data.time_slot_id,
        description: data.description,
        language_id: data.language_id,
      }

      // Call the API to reschedule the appointment using the new endpoint format
      const response = await axios.post(
        `https://api.swedenrelocators.se/api/appointment/reschedule/${appointment.id}`,
        rescheduleData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      )

      toast.success("Appointment rescheduled successfully!")
      if (onSuccess) {
        onSuccess(response.data.data)
      }
      onClose()
    } catch (error) {
      console.error("Error rescheduling appointment:", error)
      toast.error(error.response?.data?.message || "Failed to reschedule appointment. Please try again.")
    }
  })

  if (loading) {
    return (
      <Dialog open fullWidth maxWidth="md">
        <DialogTitle>Loading...</DialogTitle>
      </Dialog>
    )
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Reschedule Appointment</DialogTitle>
      <DialogContent>
        {!canReschedule ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {rescheduleError}
          </Alert>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            You can reschedule this appointment only once. The appointment will be marked as rescheduled.
          </Alert>
        )}

        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
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
                  {/* Editable fields */}
                  <Field.Select
                    native
                    name="type_id"
                    label="Appointment Type"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canReschedule}
                  >
                    <option value="">Select Appointment Type</option>
                    {appointmentTypes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select
                    native
                    name="category_id"
                    label="Appointment Category"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canReschedule}
                  >
                    <option value="">Select Appointment Category</option>
                    {appointmentCategories.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select
                    native
                    name="country"
                    label="Country"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canReschedule}
                  >
                    <option value="">Select Country</option>
                    {APPOINTMENT_COUNTRY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select
                    native
                    name="language_id"
                    label="Language"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canReschedule}
                  >
                    <option value="">Select Language</option>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.DatePicker
                    name="appointment_date"
                    label="Appointment Date (YYYY-MM-DD)"
                    placeholder="YYYY-MM-DD"
                    disabled={!canReschedule}
                  />

                  <Field.Select
                    native
                    name="time_slot_id"
                    label="Appointment Time"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canReschedule}
                  >
                    <option value="">Select Appointment Time</option>
                    {appointmentTimeSlots.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.time_range}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Text
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    sx={{ gridColumn: "1 / -1" }}
                    disabled={!canReschedule}
                  />

                  <Stack spacing={3} sx={{ gridColumn: "1 / -1", mt: 1.5 }}>
                    <Field.Checkbox
                      name="agreement"
                      label="I understand that this appointment can only be rescheduled once and agree to the terms and conditions"
                      disabled={!canReschedule}
                    />
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <LoadingButton
          onClick={methods.handleSubmit(onSubmit)}
          variant="contained"
          loading={isSubmitting}
          disabled={!canReschedule || !isValid}
        >
          Reschedule Appointment
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

