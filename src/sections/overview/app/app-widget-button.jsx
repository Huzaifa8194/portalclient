import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

import { CONFIG } from "src/config-global"

import { Iconify } from "src/components/iconify"
import { SvgColor } from "src/components/svg-color"

// ----------------------------------------------------------------------

export function AppWidgetButton({ title, icon, onClick, sx, ...other }) {
  const theme = useTheme()

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        color: "common.white",
        bgcolor: "primary.dark",
        cursor: "pointer",
        transition: theme.transitions.create(["background-color", "box-shadow"]),
        "&:hover": {
          bgcolor: "primary.darker",
          boxShadow: theme.customShadows.z8,
        },
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h4" sx={{ mb: 2, position: "relative", zIndex: 1 }}>
        {title}
      </Typography>

      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-circle-3.svg`}
        sx={{
          width: 200,
          height: 200,
          opacity: 0.08,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "primary.light",
        }}
      />

      <Iconify
        icon={icon}
        sx={{
          width: 120,
          height: 120,
          opacity: 0.12,
          position: "absolute",
          right: -40,
          bottom: -40,
        }}
      />
    </Box>
  )
}

