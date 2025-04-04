"use client"

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

export function SuccessDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="success-dialog-title"
      aria-describedby="success-dialog-description"
    >
      <DialogTitle id="success-dialog-title">Thank you for your application!</DialogTitle>
      <DialogContent>
        <DialogContentText id="success-dialog-description">
          We appreciate your interest in joining our Partner Program. Our team will carefully review your application,
          and you can expect to hear from us soon.
          <br />
          <br />
          One of our Partner Program Experts will reach out to you for further discussions. If your application is
          approved, you will receive a confirmation email along with your login credentials to access the partner
          portal.
          <br />
          <br />
          Additionally, we will schedule a 1-hour demo call to introduce you to our system, ensuring you have a seamless
          onboarding experience.
          <br />
          <br />
          Should you have any questions in the meantime, feel free to contact us.
          <br />
          <br />
          We look forward to partnering with you!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

