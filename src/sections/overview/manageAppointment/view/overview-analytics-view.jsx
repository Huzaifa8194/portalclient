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

import { CONFIG } from "src/config-global"
import { DashboardContent } from "src/layouts/dashboard"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { AnalyticsWidgetSummary } from "../analytics-widget-summary"
import { RescheduleAppointmentForm } from "./reschedule-appointment-form"

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  boxShadow: theme.customShadows.z16,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  position: "relative",
  // Removed the &::after pseudo-element that was creating the green shadow
}))

const DetailCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  background: "linear-gradient(to bottom right, #ffffff, #f5f5f5)",
  overflow: "hidden",
  position: "relative",
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
    {
      label: "Appointment Date",
      content: updatedAppointment.appointment_date,
    },
    {
      label: "Appointment Time",
      content: loading ? "Loading..." : getTimeSlotLabel(updatedAppointment.time_slot_id),
    },
    {
      label: "Country",
      content: updatedAppointment.country,
    },
    {
      label: "Language",
      content: updatedAppointment.language,
    },
    {
      label: "Description",
      content: updatedAppointment.description,
    },
    {
      label: "Payment Type",
      content: updatedAppointment.invoice.payment_type,
    },
    {
      label: "Total Amount",
      content: `${updatedAppointment.invoice.total_amount} ${updatedAppointment.invoice.currency_name}`,
    },
    // {
    //   label: "Rescheduled",
    //   content: updatedAppointment.is_rescheduled === 1 ? "Yes" : "No",
    // },
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
            sx={{ height: 240 }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Appointment Type"
            total={updatedAppointment.type_name}
            color="info"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />}
            sx={{ height: 240 }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Invoice No"
            total={updatedAppointment.invoice.invoice_no}
            color="warning"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />}
            sx={{ height: 240 }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Status"
            total={updatedAppointment.invoice.status}
            color="error"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-message.svg`} />}
            sx={{ height: 240 }}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <StyledCard>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 24,
                      
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Appointment Details
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleRescheduleClick}
                  disabled={updatedAppointment.is_rescheduled === 1}
                  sx={{
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Reschedule Appointment
                </Button>
              </Box>

              <Box sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                <Grid container spacing={3}>
                  {Array.from({ length: Math.ceil(appointmentDetails.length / 3) }).map((_, groupIndex) => {
                    const startIdx = groupIndex * 3
                    const groupDetails = appointmentDetails.slice(startIdx, startIdx + 3)

                    return (
                      <Grid key={groupIndex} xs={12} md={4}>
                        <DetailCard elevation={2}>
                          <CardContent sx={{ p: 3 }}>
                            {groupDetails.map((detail, detailIndex) => (
                              <Box
                                key={detailIndex}
                                sx={{
                                  mb: detailIndex < groupDetails.length - 1 ? 3 : 0,
                                  pl: 1,
                                }}
                              >
                                <Box sx={{ mb: 0.5 }}>
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="600"
                                    color="text.secondary"
                                    sx={{
                                      textTransform: "uppercase",
                                      fontSize: "0.75rem",
                                      letterSpacing: "0.5px",
                                    }}
                                  >
                                    {detail.label}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="body1"
                                    fontWeight="500"
                                    sx={{
                                      color: "text.primary",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {detail.content || "—"}
                                  </Typography>
                                </Box>
                                {detailIndex < groupDetails.length - 1 && (
                                  <Box sx={{ borderBottom: "1px dashed rgba(0,0,0,0.1)", my: 2 }} />
                                )}
                              </Box>
                            ))}
                          </CardContent>
                        </DetailCard>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
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

