import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

import { CONFIG } from "src/config-global"

import { Iconify } from "src/components/iconify"
import { SvgColor } from "src/components/svg-color"

// ----------------------------------------------------------------------

export function AppWidget({ title, icon, sx, ...other }) {
  const theme = useTheme()

  const handleHostFamilyClick = () => {
    console.log("Host Family button clicked")
    // Add your logic here
  }

  const handleAuPairClick = () => {
    console.log("I am au pair button clicked")
    // Add your logic here
  }

  return (
    <Box
      sx={{
        p: 3,
        gap: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        alignItems: "center",
        color: "common.white",
        bgcolor: "primary.dark",
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleHostFamilyClick} sx={{ minWidth: 120 }}>
          Host Family
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAuPairClick} sx={{ minWidth: 120 }}>
          I am au pair
        </Button>
      </Box>

      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-circle-3.svg`}
        sx={{
          width: 200,
          height: 200,
          opacity: 0.08,
          position: "absolute",
          color: "primary.light",
        }}
      />

      <Iconify
        icon={icon}
        sx={{
          width: 120,
          right: -40,
          height: 120,
          opacity: 0.08,
          position: "absolute",
        }}
      />
    </Box>
  )
}

