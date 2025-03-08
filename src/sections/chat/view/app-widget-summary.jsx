import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Iconify } from "src/components/iconify"

export function AppWidgetSummary({ title, total, icon, extratext, sx, ...other }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
          {title}
        </Typography>

        <Typography variant="h4">{total}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {extratext}
        </Typography>
      </Stack>

      <Box
        sx={{
          width: 48,
          height: 48,
          display: "flex",
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.lighter",
          color: "primary.main",
        }}
      >
        <Iconify icon={icon} width={24} />
      </Box>
    </Card>
  )
}

