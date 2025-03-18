"use client"

import { m } from "framer-motion"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { alpha as hexAlpha } from "@mui/material/styles"

// Mock configuration for assets directory
const CONFIG = {
  assetsDir: "",
}

// Mock bgGradient and varAlpha functions (similar to the ones in the example)
const bgGradient = ({ color, imgUrl }) => ({
  position: "relative",
  backgroundImage: `linear-gradient(${color}), url(${imgUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
})

const varAlpha = (color, opacity) => hexAlpha(color, opacity)

export function AccountBillingBronze({ sx, ...other }) {
  return (
    <Stack
      sx={{
        ...bgGradient({
          color: `135deg, ${hexAlpha("#F7BB95", 0.92)}, ${hexAlpha("#5B2FF3", 0.92)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/background/background-7.webp`,
        }),
        px: 3,
        py: 1.5,
        borderRadius: 2,
        position: "relative",
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          borderRadius: 2,
          position: "absolute",
          border: (theme) => `solid 3px ${varAlpha(theme.palette.common.white, 0.16)}`,
        }}
      />

      <Box
        component={m.img}
        animate={{ y: [8, -8, 8] }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0,
        }}
        alt="Small Rocket"
        src={`${CONFIG.assetsDir}/assets/illustrations/illustration-rocket-small.webp`}
        sx={{ right: 0, width: 80, height: 80, position: "absolute" }}
      />

      <Stack alignItems="flex-start" sx={{ position: "relative" }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "common.white",
            fontWeight: 700,
            mb: 0.5,
            textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Your Digital Wallet
        </Typography>

        <Box component="span" sx={{ typography: "h6", color: "common.white" }}>
          Bronze
        </Box>

        <Box
          component="span"
          sx={{
            mb: 0.5,
            mt: 0.1,
            color: "common.white",
            typography: "subtitle2",
          }}
        >
          Your Wallet Balance: $35
        </Box>

        <Button variant="contained" size="small" color="warning">
          Withdraw Funds
        </Button>
      </Stack>
    </Stack>
  )
}

