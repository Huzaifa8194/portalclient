import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"

import { fNumber, fPercent } from "src/utils/format-number"

import { CONFIG } from "src/config-global"
import { varAlpha, bgGradient } from "src/theme/styles"

import { Iconify } from "src/components/iconify"
import { SvgColor } from "src/components/svg-color"
import { Chart, useChart } from "src/components/chart"

// ----------------------------------------------------------------------

export function AnalyticsWidgetSummary({ icon, title, total, chart, percent, color = "primary", sx, ...other }) {
  const theme = useTheme()

  
  const displayTitle = typeof title === "string" ? title : String(title || "")

  const renderTrending = percent !== undefined && (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Iconify width={20} icon={percent < 0 ? "eva:trending-down-fill" : "eva:trending-up-fill"} />
      <Box component="span" sx={{ typography: "subtitle2" }}>
        {percent > 0 && "+"}
        {fPercent(percent)}
      </Box>
    </Box>
  )

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: "none",
        position: "relative",
        color: `${color}.darker`,
        backgroundColor: "common.white",
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: "subtitle2" }}>{displayTitle}</Box>
          <Box sx={{ typography: "h4" }}>{total}</Box>
        </Box>
      </Box>

      {renderTrending}

      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: "absolute",
          color: `${color}.main`,
        }}
      />
    </Card>
  )
}

// Update PropTypes to accept more types for title
AnalyticsWidgetSummary.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.shape({
    series: PropTypes.arrayOf(PropTypes.number),
    categories: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.shape({}), 
  }),
  percent: PropTypes.number,
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error"]),
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      
      m: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      ml: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      pt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      pr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      pb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      pl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      
    }),
  ]),
}

