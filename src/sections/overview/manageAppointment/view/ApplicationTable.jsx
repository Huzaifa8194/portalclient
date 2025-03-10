"use client"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItemText"
import { Image } from "src/components/image"
import { varAlpha } from "src/theme/styles"
import { AvatarShape } from "src/assets/illustrations"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import axios from "axios" // Make sure to import axios
import { useAuthContext } from "src/auth/hooks" // Import the auth context hook
import { OverviewAnalyticsView } from "./overview-analytics-view"

export function ApplicationTable() {
  const image =
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/red-and-blue-pillars-wallpaper-abstract-background-free-image.jpeg?w=600&quality=80"
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useAuthContext() // Get the user from auth context

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get("https://api.swedenrelocators.se/api/appointment/list", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // Add the access token to the request header
          },
        })

        // Ensure time_slot_id is properly set for each appointment
        const appointmentsWithTimeSlotId = response.data.data.map((appointment) => ({
          ...appointment,
          // Make sure time_slot_id is used, not time_slot
          time_slot_id: appointment.time_slot_id,
        }))

        setAppointments(appointmentsWithTimeSlotId)
      } catch (err) {
        console.error("Error fetching appointments:", err)
        setError("Failed to fetch appointments. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (user && user.accessToken) {
      fetchAppointments()
    }
  }, [user])

  const handleViewClick = (appointment) => {
    setSelectedApplication(appointment)
  }

  const handleBack = () => {
    setSelectedApplication(null)
  }

  if (selectedApplication) {
    return <OverviewAnalyticsView appointment={selectedApplication} onBack={handleBack} />
  }

  if (loading) {
    return <Typography>Loading appointments...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  return (
    <Box sx={{ padding: "20px 24px" }}>
      <CustomBreadcrumbs
        heading="Application Status"
        links={[{ name: "Dashboard" }, { name: "Application Status" }, { name: "Application Detail" }]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />

      <Grid container spacing={3}>
        {appointments.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.id}>
            <Card sx={{ textAlign: "center" }}>
              <Box sx={{ position: "relative" }}>
                <AvatarShape
                  sx={{
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    mx: "auto",
                    bottom: -26,
                    position: "absolute",
                  }}
                />

                <Avatar
                  alt={app.category_name}
                  src="/static/images/avatar_placeholder.png"
                  sx={{
                    width: 64,
                    height: 64,
                    zIndex: 11,
                    left: 0,
                    right: 0,
                    bottom: -32,
                    mx: "auto",
                    position: "absolute",
                  }}
                />

                <Image
                  src={image || "/placeholder.svg"}
                  alt="Cover"
                  ratio="16/9"
                  slotProps={{
                    overlay: {
                      bgcolor: (theme) => varAlpha(theme.vars.palette.common.blackChannel, 0.48),
                    },
                  }}
                />
              </Box>

              <ListItemText
                sx={{ mt: 7, mb: 1 }}
                primary={app.category_name}
                secondary={app.type_name}
                primaryTypographyProps={{ typography: "subtitle1" }}
                secondaryTypographyProps={{ component: "span", mt: 0.5 }}
              />

              <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Invoice No:</strong> {app.invoice.invoice_no}
                </Typography>
              </Stack>

              <Divider sx={{ borderStyle: "dashed" }} />

              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 3, typography: "subtitle1" }}>
                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                    Appointment Date
                  </Typography>
                  {app.appointment_date}
                </div>

                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                    Status
                  </Typography>
                  {app.invoice.status}
                </div>
              </Box>

              <Divider sx={{ borderStyle: "dashed" }} />

              <Box sx={{ py: 2 }}>
                <Button variant="contained" onClick={() => handleViewClick(app)}>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

