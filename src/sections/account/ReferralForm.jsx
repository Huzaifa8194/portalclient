"use client"

import { useState } from "react"
import { Button, TextField, Typography, Box, Paper } from "@mui/material"

export function ReferralForm({ onSuccess }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = () => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (!newEmail) {
      setEmailError("Email is required")
    } else if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format")
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setEmailError("Email is required")
      return
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format")
      return
    }
    if (email && validateEmail(email)) {
      onSuccess(name, email)
      // Reset form fields
      setName("")
      setEmail("")
      setPhone("")
      setAddress("")
      setEmailError("")
    }
  }

  const isFormEmpty = !name && !email && !phone && !address

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
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Add Referral
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="tel"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          disabled={isFormEmpty || !!emailError}
        >
          Send Referral
        </Button>
      </Box>
    </Paper>
  )
}

