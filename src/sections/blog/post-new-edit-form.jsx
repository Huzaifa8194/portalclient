"use client"

import { z as zod } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useEffect, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import axios from "src/utils/axios"

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
        const [typeResponse, categoriesResponse] = await Promise.all([
          axios.get("https://api.swedenrelocators.se/api/miscellaneous/appointmentTypes"),
          axios.get("https://api.swedenrelocators.se/api/miscellaneous/appointmentCategories"),
        ])

        console.log("Appointment Types:", typeResponse.data)
        console.log("Appointment Categories:", categoriesResponse.data)

        setAppointmentTypes(typeResponse.data.data || [])
        setAppointmentCategories(categoriesResponse.data.data || [])
      } catch (error) {
        console.error("Error fetching appointment data:", error)
        toast.error(error.response?.data?.message || "Failed to load some appointment options. Please try again.")
      }
    }

    fetchAppointmentData()
  }, [])

  const fetchTimeSlots = async (date) => {
    if (!date) return

    try {
      console.log("Fetching time slots for date:", date)
      const response = await axios.post("https://api.swedenrelocators.se/api/miscellaneous/appointment/timeSlots", {
        appointment_date: date,
      })

      console.log("Time slots API response:", response.data)

      if (response.data && response.data.data) {
        const timeSlots = Object.values(response.data.data)
        console.log("Processed time slots:", timeSlots)

        if (timeSlots.length > 0) {
          setAppointmentTimeSlots(timeSlots)
        } else {
          console.log("No time slots available for this date")
          setAppointmentTimeSlots([])
        }
      } else {
        console.log("No data returned from API or unexpected format")
        setAppointmentTimeSlots([])
      }
    } catch (error) {
      console.error("Error fetching time slots:", error)
      toast.error(error.response?.data?.message || "Failed to load available time slots. Please try again.")
      setAppointmentTimeSlots([])
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setFormSubmitted(true)
      toast.success(currentPost ? "Update success!" : "Create success!")
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "An error occurred. Please try again.")
    }
  })

  const handleApplyPromoCode = async () => {
    const promoCode = getValues("promocode")
    if (!promoCode) {
      toast.error("Please enter a promo code.")
      return
    }

    try {
      const response = await axios.post("https://api.swedenrelocators.se/api/miscellaneous/coupon/validate", {
        code: promoCode,
        service: "Appointment",
      })

      if (response.data.success) {
        toast.success(`Promo code "${promoCode}" applied successfully!`)
       
      } else {
        toast.error(response.data.message || "Invalid promo code.")
      }
    } catch (error) {
      console.error("Error validating promo code:", error)
      toast.error(error.response?.data?.message || "Invalid Promo Code")
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
  
    try {
      if (emptyFields.length === 0) {
        const appointmentData = {
          type_id: formData.category,
          language_id: 1,
          category_id: formData.category2,
          country: formData.category3,
          appointment_date: formData.dateofbirth,
          time_slot_id: formData.category4,
          description: formData.description,
          is_coupon: formData.promocode ? 1 : 0,
          net_total_amount: 0,
          total_amount: 0,
          transaction_id: "PENDING",
          vat: 0,
        }
        console.log("Appointment data being sent:", appointmentData)
        const response = await axios.post("https://api.swedenrelocators.se/api/appointment/book", appointmentData)
        console.log("Appointment booked:", response.data)
        toast.success(response.data.message)
  
        reset()
  
        setAppointmentTimeSlots([])
      } else {
        clearErrors()
        emptyFields.forEach((field) => {
          setError(field, {
            type: "manual",
            message: "This field is required",
          })
        })
        throw new Error("Please fill in all required fields.")
      }
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error)
      toast.error(error.response?.data?.message || error.message)
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
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <Field.Select native name="category" label="Appointment Type" InputLabelProps={{ shrink: true }}>
                <option value="">Choose An Option</option>
                {appointmentTypes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="category2" label="Appointment Category" InputLabelProps={{ shrink: true }}>
                <option value="">Choose An Option</option>
                {appointmentCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="category3" label="Appointment Country" InputLabelProps={{ shrink: true }}>
                {/* <option value="">Choose An Option</option> */}
                {APPOINTMENT_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field.Select>

              <Field.DatePicker
                name="dateofbirth"
                label="Appointment Date"
                format="YYYY-MM-DD"
                inputFormat="YYYY-MM-DD"
                disablePast
                shouldDisableDate={(date) => {
                  
                  const now = new Date()
                  const tomorrow = new Date(now)
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(0, 0, 0, 0)

                  
                  let jsDate

                  
                  if (typeof date.format === "function") {
                    jsDate = date.toDate() 
                  }
                  
                  else if (date._isAMomentObject) {
                    jsDate = date.toDate() 
                  }
                  
                  else if (date instanceof Date) {
                    jsDate = date
                  }
                  
                  else if (typeof date.toDate === "function") {
                    jsDate = date.toDate()
                  }
                 
                  else if (typeof date.toJSDate === "function") {
                    jsDate = date.toJSDate()
                  }
                  
                  else {
                    
                    const dayOfWeek =
                      typeof date.getDay === "function"
                        ? date.getDay()
                        : date.day !== undefined
                          ? date.day()
                          : new Date(date).getDay()

                    
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                      return true
                    }

                    
                    const selectedCountry = getValues("category3")

                    
                    if (selectedCountry === "sweden" && (dayOfWeek < 1 || dayOfWeek > 4)) {
                      
                      return true
                    }

                    if (selectedCountry === "denmark" && dayOfWeek !== 5) {
                      
                      return true
                    }

                    const dateObj = new Date(date)
                    return dateObj < tomorrow
                  }

                  const dayOfWeek = jsDate.getDay()

                  if (dayOfWeek === 0 || dayOfWeek === 6) {
                    return true
                  }

                  const selectedCountry = getValues("category3")

                  if (selectedCountry === "sweden" && (dayOfWeek < 1 || dayOfWeek > 4)) {
                    
                    return true
                  }

                  if (selectedCountry === "denmark" && dayOfWeek !== 5) {
                    
                    return true
                  }

                  
                  return jsDate < tomorrow
                }}
                onChange={(date) => {
                  if (date) {
                    console.log("Date object type:", typeof date, date)

                    let formattedDate

                    if (typeof date === "string") {
                      formattedDate = date
                    }

                    else if (typeof date.format === "function") {
                      formattedDate = date.format("YYYY-MM-DD")
                    }
                    
                    else if (typeof date.toISOString === "function") {
                      
                      const d = new Date(date)
                      const year = d.getFullYear()
                      const month = String(d.getMonth() + 1).padStart(2, "0")
                      const day = String(d.getDate()).padStart(2, "0")
                      formattedDate = `${year}-${month}-${day}`
                    }
                    
                    else {
                      formattedDate = String(date)
                    }

                    setValue("dateofbirth", formattedDate)
                    console.log("Selected date formatted:", formattedDate)

                    
                    setValue("category4", "")

                    
                    fetchTimeSlots(formattedDate)
                  }
                }}
                slotProps={{
                  textField: {
                    inputProps: {
                      placeholder: "YYYY-MM-DD",
                    },
                  },
                }}
              />

              <Field.Select native name="category4" label="Appointment Time" InputLabelProps={{ shrink: true }}>
                <option value="">Choose An Option</option>
                {appointmentTimeSlots.length > 0 ? (
                  appointmentTimeSlots.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.slot}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No available time slots for selected date
                  </option>
                )}
              </Field.Select>

              <Field.Text
                name="description"
                label="Appointment Description"
                multiline
                rows={3}
                sx={{ gridColumn: "1 / -1" }} 
              />
            </Box>

            <Stack spacing={1.5} direction="row" alignItems="center" sx={{ mt: 3 }}>
              <Field.Text name="promocode" label="Do you have a Promo Code?" gap={3} sx={{ flex: 1, maxWidth: 350 }} />
              <LoadingButton onClick={handleApplyPromoCode} variant="contained" loading={isSubmitting}>
                Add Promo Code
              </LoadingButton>
            </Stack>

            <Stack spacing={3} sx={{ mt: 1.5 }}>
              <Field.Checkbox name="agreement" label="I agree to the Appointment Terms & Conditions" sx={{ mt: 3 }} />
            </Stack>

            <Stack spacing={3} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
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

