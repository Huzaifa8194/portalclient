import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { useState } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

import { fNumber } from "src/utils/format-number"
import { useNavigate } from "react-router-dom"
import { Chart, useChart } from "src/components/chart"

// ----------------------------------------------------------------------

export function AppWidgetSummary({ title, percent, total, chart, sx, renderCustomContent, coApplicants = [], documents = [], ...other }) {
  const theme = useTheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDocs, setShowDocs] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)

  const dummyCoApplicants = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "David Brown"]
  const dummyDocuments = [
    { name: "Obaid", count: 54 },
    { name: "Aisha", count: 32 },
    { name: "Rahul", count: 21 },
    { name: "Sophia", count: 40 },
    { name: "Liam", count: 15 }
  ]

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
        minHeight: "38vh",
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

        {title === "Co-applicants" && (
          <Box sx={{ mt: 2 }}>
            <Button variant="text" onClick={() => setShowDropdown(!showDropdown)}>
              {showDropdown ? "Hide names" : "Show names"}
            </Button>
            {showDropdown && (
              <Box sx={{ mt: 1 }}>
                {dummyCoApplicants.map((name, index) => (
                  <Box key={index} sx={{ typography: "body2", mb: 0.5 }}>
                    {name}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {title === "Documents" && (
          <Box sx={{ mt: 2 }}>
            <Button variant="text" onClick={() => setShowDocs(!showDocs)}>
              {showDocs ? "Hide submitted documents" : "Show submitted documents"}
            </Button>
            {showDocs && (
              <Box sx={{ mt: 1 }}>
                {dummyDocuments.map((doc, index) => (
                  <Box key={index} sx={{ typography: "body2", mb: 0.5 }}>
                    {doc.name} - {doc.count} submitted
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {title === "Appointment" && (
          <Box sx={{ mt: 2 }}>
            <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
              <Tab label="Sweden Relocators" />
              <Tab label="Authority" />
            </Tabs>
            {/*  */}
          </Box>
        )}

        {renderCustomContent && renderCustomContent()}
      </Box>

      <Chart type="bar" series={[{ data: chart.series }]} options={chartOptions} width={60} height={40} />
    </Card>
  )
}
