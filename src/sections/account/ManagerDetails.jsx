import { Box, Typography, Avatar, Divider, Grid, Link, Card } from "@mui/material"
import { _mock } from "src/_mock"

export function ManagerDetails({ case_manager }) {
  // Use the passed case_manager prop or fallback to default values if not provided
  const manager = case_manager || {
    name: "Naufil",
    designation: "Senior Case Manager",
    profile_pic: "https://example.com/manager-profile.jpg",
    phone: "+92 (345) 123-4567",
    email: "naufil@gmail.com",
  }

  return (
    <Card sx={{ width: "100%", px: 3, pb: 8, pt: 2, mt:2 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2, pt:2, fontWeight: 500 }}>
        Your Case Manager
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          src={_mock.image.avatar(24)}
          alt={manager.name}
          sx={{
            width: 60,
            height: 60,
            mr: 2,
          }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {manager.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {manager.designation}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
              Phone:
            </Typography>
            <Link href={`tel:${manager.phone}`} underline="hover" variant="body2">
              {manager.phone}
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70 }}>
              Email:
            </Typography>
            <Link href={`mailto:${manager.email}`} underline="hover" variant="body2">
              {manager.email}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

