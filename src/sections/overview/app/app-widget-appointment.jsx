import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Iconify } from "src/components/iconify"
import { AppWidgetSummary } from "./app-widget-summary"

export function AppWidgetAppointment({ appointment, ...props }) {
  const renderAppointmentInfo = () => {
    if (appointment) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
          <Iconify icon={`flag:${appointment.country.toLowerCase()}-4x3`} width={24} sx={{ mr: 1 }} />
          <Typography variant="body2">{`${appointment.date} at ${appointment.time}`}</Typography>
        </Box>
      )
    }
    return (
      <Button variant="outlined" onClick={() => console.log("Navigating to: /dashboard/post/new")} sx={{ mt: 1.5 }}>
        Book Now
      </Button>
    )
  }

  return <AppWidgetSummary {...props} renderCustomContent={renderAppointmentInfo} />
}

