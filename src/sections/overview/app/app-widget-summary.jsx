import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"

import { fNumber } from "src/utils/format-number"
import { useNavigate } from "react-router-dom"
import { Chart, useChart } from "src/components/chart"

// ----------------------------------------------------------------------

export function AppWidgetSummary({ title, percent, total, chart, sx, renderCustomContent, ...other }) {
  const theme = useTheme()

  const chartColors = chart.colors ?? [theme.palette.primary.main]

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    tooltip: {
      y: { formatter: (value) => fNumber(value), title: { formatter: () => "" } },
    },
    plotOptions: { bar: { borderRadius: 1.5, columnWidth: "64%" } },
    ...chart.options,
  })
  const navigate = useNavigate()

  const handleButtonClick = (path) => {
    console.log("Navigating to:", path)
    navigate(path)
  }
  const getPath = (ti) => {
    switch (ti) {
      case "Co-applicants":
        return "/dashboard/job"
      case "Documents":
        return "/dashboard/product/new"
      case "Appointment":
        console.log("Work Permit")
        return "/dashboard/post/new"
      default:
        return "#"
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 3,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: "subtitle2" }}>{title}</Box>
        <Box sx={{ mt: 1.5, mb: 1, typography: "h3" }}>{fNumber(total)}</Box>
        <Button variant="outlined" onClick={() => handleButtonClick(getPath(title))}>
          {title === "Co-applicant"
            ? "Add"
            : title === "Documents"
              ? "Upload"
              : title === "Appointment"
                ? "Book Now"
                : "Go now"}
        </Button>

        {renderCustomContent && renderCustomContent()}
      </Box>

      <Chart type="bar" series={[{ data: chart.series }]} options={chartOptions} width={60} height={40} />
    </Card>
  )
}

