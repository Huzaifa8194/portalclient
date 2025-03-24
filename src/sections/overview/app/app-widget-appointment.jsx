"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Iconify } from "src/components/iconify"
import { AppWidgetSummary } from "./app-widget-summary"

export function AppWidgetAppointment({
  appointment,
  initialExpanded = false,
  onToggleExpand,
  displayContent = false,
  onToggleDisplayContent,
  ...props
}) {
  const renderAppointmentInfo = () => {
    if (appointment) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Iconify icon={`flag:${appointment.country.toLowerCase()}-4x3`} width={24} sx={{ mr: 1 }} />
            <Typography variant="body2">{`${appointment.date} at ${appointment.time}`}</Typography>
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Iconify icon="mdi:calendar-clock" width={24} sx={{ mr: 1 }} />
            <Typography variant="body2">Appointment with Swedish Migration Agency</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Iconify icon="mdi:map-marker" width={24} sx={{ mr: 1 }} />
            <Typography variant="body2">Migration Office, Stockholm</Typography>
          </Box> */}
        </Box>
      )
    }

    return (
      <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button
          variant="outlined"
          onClick={() => console.log("Navigating to: /dashboard/post/new")}
          sx={{
            maxWidth: "120px",
            width: "100%",
          }}
        >
          Book Now
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
          No appointments scheduled yet
        </Typography>
      </Box>
    )
  }

  return (
    <AppWidgetSummary
      {...props}
      renderCustomContent={renderAppointmentInfo}
      initialExpanded={initialExpanded}
      onToggleExpand={onToggleExpand}
      displayContent={displayContent}
      onToggleDisplayContent={onToggleDisplayContent}
    />
  )
}

