"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from "@mui/material"
import {Iconify} from "src/components/iconify"

export function SuccessDialogUni({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">University Registration Successful</Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: "grey.500" }}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            What happens next?
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for submitting your request. We will review it and respond within 72 hours if any additional
            information is required. Otherwise, we will provide you with login credentials, giving you seamless access
            to manage the digital profiles of students referred by Sweden Relocators.
          </Typography>
          <Typography variant="body1" paragraph>
            You can also ask your students to register on our website or through our mobile app as individuals, and we
            will automatically link their profiles to your account. Additionally, you have the flexibility to create
            student profiles yourself for those who require assistance, and we will handle the rest.
          </Typography>
          <Typography variant="body1" paragraph>
            With our one-window relocation and immigration solution, you can effortlessly manage the entire student
            journey—from profile creation and visa support to accommodation and settlement—through a single,
            user-friendly platform. This ensures a smooth, efficient, and hassle-free experience for both you and your
            students.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  )
}
