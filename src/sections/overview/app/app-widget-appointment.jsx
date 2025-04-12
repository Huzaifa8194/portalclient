"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { AppWidgetSummary } from "./app-widget-summary"

export function AppWidgetAppointment({
  title,
  percent,
  total,
  appointment,
  initialExpanded = false,
  onToggleExpand,
  displayContent = false,
  onToggleDisplayContent,
  ...props
}) {
  // Create a direct SVG calendar icon
  const calendarIcon = (
    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </Box>
  )

  const renderAppointmentInfo = () => {
    if (appointment) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2">{`${appointment.date} at ${appointment.time}`}</Typography>
          </Box>
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
      title={title}
      percent={percent}
      total={total}
      action={calendarIcon}
      renderCustomContent={renderAppointmentInfo}
      initialExpanded={initialExpanded}
      onToggleExpand={onToggleExpand}
      displayContent={displayContent}
      onToggleDisplayContent={onToggleDisplayContent}
      {...props}
    />
  )
}

export default AppWidgetAppointment
