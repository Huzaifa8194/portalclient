"use client"

import { useState } from "react"
import { Button, Typography, Box, Paper, CircularProgress, Stack } from "@mui/material"
import axios from "axios"
import { toast } from "src/components/snackbar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"
import { Form, Field } from "src/components/hook-form"

// Define the schema for form validation
const ReferralSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
  phoneNumber: zod.string().min(1, { message: "Phone number is required" }),
})

export function ReferralForm({ onSuccess }) {
  const [loading, setLoading] = useState(false)

  // Initialize form with React Hook Form
  const methods = useForm({
    resolver: zodResolver(ReferralSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  })

  const { handleSubmit, reset, formState } = methods

  const onSubmit = async (data) => {
    setLoading(true)
    const token = localStorage.getItem("authToken")

    try {
      // Prepare data for API
      const referralData = {
        name: data.name,
        email: data.email,
        phone_number: data.phoneNumber,
      }

      // Send POST request to API
      const response = await axios.post("https://api.swedenrelocators.se/api/client/referral/add", referralData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      // Handle successful response
      console.log("Referral added successfully:", response.data)
      toast.success(response.data.message || "Referral added successfully!")

      // Call the onSuccess callback with the response data
      if (typeof onSuccess === "function") {
        // Pass name and email as separate parameters
        onSuccess(data.name, data.email)
      }

      // Reset form fields
      reset()
    } catch (err) {
      console.error("Error adding referral:", err)

      // Handle error response
      let errorMessage = "Failed to add referral. Please try again."

      if (err.response?.status === 401) {
        errorMessage = "Authentication failed. Please log in again."
        console.log("Auth token issue:", token ? "Token exists" : "No token provided")
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: "grey.300",
      }}
    >
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Add Referral
        </Typography>

        <Stack spacing={3} sx={{ mb: 3 }}>
          <Field.Text name="name" label="Name" autoFocus />

          <Field.Text name="email" label="Email" type="email" />

          <Field.Phone name="phoneNumber" label="Contact Number" />
        </Stack>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Sending..." : "Send Referral"}
          </Button>
        </Box>
      </Form>
    </Paper>
  )
}

