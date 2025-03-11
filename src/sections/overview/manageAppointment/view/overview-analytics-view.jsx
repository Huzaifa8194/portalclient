"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Grid from "@mui/material/Unstable_Grid2"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { styled } from "@mui/material/styles"
import List from "@mui/material/List"

import { CONFIG } from "src/config-global"
import { DashboardContent } from "src/layouts/dashboard"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { AnalyticsWidgetSummary } from "../analytics-widget-summary"
import { RescheduleAppointmentForm } from "./reschedule-appointment-form"

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  boxShadow: theme.customShadows.z16,
}))

export function OverviewAnalyticsView({ appointment, onBack }) {
  const [timeSlots, setTimeSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRescheduleForm, setShowRescheduleForm] = useState(false)
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment)

  useEffect(() => {
    axios
      .get("https://api.swedenrelocators.se/api/miscellaneous/appointmentTimeSlots")
      .then((response) => {
        setTimeSlots(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error)
        setLoading(false)
      })
  }, [])


  const getTimeSlotLabel = (id) => {
    if (!id) return "Not specified" // If ID is missing, return fallback
    const timeSlot = timeSlots.find((slot) => slot.id === Number(id))
    return timeSlot ? timeSlot.time_range : "Not specified"
  }

  const handleRescheduleClick = () => {
    setShowRescheduleForm(true)
  }

  const handleRescheduleClose = () => {
    setShowRescheduleForm(false)
  }

  const handleRescheduleSuccess = (updatedData) => {

    setUpdatedAppointment({
      ...updatedAppointment,
      ...updatedData,
      is_rescheduled: 1,
    })
  }

  const appointmentDetails = [
    { label: "Appointment Date", content: updatedAppointment.appointment_date },
    {
      label: "Appointment Time",
      content: loading ? "Loading..." : getTimeSlotLabel(updatedAppointment.time_slot_id),
    },
    { label: "Category", content: updatedAppointment.category_name },
    { label: "Type", content: updatedAppointment.type_name },
    { label: "Country", content: updatedAppointment.country },
    { label: "Language", content: updatedAppointment.language },
    { label: "Description", content: updatedAppointment.description },
    { label: "Invoice No", content: updatedAppointment.invoice.invoice_no },
    { label: "Payment Type", content: updatedAppointment.invoice.payment_type },
    {
      label: "Total Amount",
      content: `${updatedAppointment.invoice.total_amount} ${updatedAppointment.invoice.currency_name}`,
    },
    { label: "Status", content: updatedAppointment.invoice.status },
    {
      label: "Rescheduled",
      content: updatedAppointment.is_rescheduled === 1 ? "Yes" : "No",
    },
  ]

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Manage Appointments
        </Typography>
        <CustomBreadcrumbs
          links={[
            { name: "Dashboard", href: "/" },
            { name: "Manage Appointments", href: "/applications" },
            { name: "Appointment Details" },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            mb: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Back to Appointments
        </Button>

      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Application Type"
            total={updatedAppointment.category_name}
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Appointment Type"
            total={updatedAppointment.type_name}
            color="info"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Invoice No"
            total={updatedAppointment.invoice.invoice_no}
            color="warning"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Status"
            total={updatedAppointment.invoice.status}
            color="error"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-message.svg`} />}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Appointment Details
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRescheduleClick}
                  disabled={updatedAppointment.is_rescheduled === 1}
                >
                  Reschedule Appointment
                </Button>
              </Box>

              <List sx={{ p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                <Grid container spacing={2}>
                  {appointmentDetails.map((detail, index) => (
                    <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: "white",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">
                          {detail.label}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          {detail.content}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {showRescheduleForm && (
        <RescheduleAppointmentForm
          appointment={updatedAppointment}
          onClose={handleRescheduleClose}
          onSuccess={handleRescheduleSuccess}
        />
      )}
    </DashboardContent>
  )
}

