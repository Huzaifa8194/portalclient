import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import { fNumber } from "src/utils/format-number"
import { useNavigate } from "react-router-dom"
import { Chart, useChart } from "src/components/chart"
import { Iconify } from "src/components/iconify"

// ----------------------------------------------------------------------

export function AppWidgetSummary({ 
  title, 
  percent, 
  total, 
  chart, 
  sx, 
  renderCustomContent, 
  coApplicants = [], 
  documents = [], 
  initialExpanded = true,
  onToggleExpand,
  ...other 
}) {
  const theme = useTheme()
  const [showDropdown, setShowDropdown] = useState(true) // Default to true to show content
  const [showDocs, setShowDocs] = useState(true) // Default to true to show content
  const [tabIndex, setTabIndex] = useState(0)
  const [expanded, setExpanded] = useState(initialExpanded)

  // Update expanded state when initialExpanded prop changes
  useEffect(() => {
    setExpanded(initialExpanded);
  }, [initialExpanded]);

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

  const toggleExpand = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    if (onToggleExpand) {
      onToggleExpand(newExpandedState);
    }
  }

  // Determine if this card should have expandable content
  const hasExpandableContent = title === "Co-applicants" || title === "Documents" || title === "Appointment"

  // Get content based on title
  const getExpandableContent = () => {
    if (title === "Co-applicants") {
      return (
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
      );
    }
    
    if (title === "Documents") {
      return (
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
      );
    }
    
    if (title === "Appointment") {
      return (
        <Box sx={{ mt: 2 }}>
          <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
            <Tab label="Sweden Relocators" />
            <Tab label="Authority" />
          </Tabs>
        </Box>
      );
    }
    
    return null;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        height: '100%',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      {/* Header with title, total, and chart */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Box sx={{ typography: "subtitle2" }}>{title}</Box>
          <Box sx={{ mt: 1.5, typography: "h3" }}>{fNumber(total)}</Box>
        </Box>
        <Chart type="bar" series={[{ data: chart.series }]} options={chartOptions} width={60} height={40} />
      </Box>

      {/* Action button */}
      <Button 
        variant="outlined" 
        onClick={() => handleButtonClick(getPath(title))}
        sx={{ mb: hasExpandableContent ? 2 : 0 }}
      >
        {title === "Co-applicants"
          ? "Add"
          : title === "Documents"
            ? "Upload"
            : title === "Appointment"
              ? "Book Now"
              : "Go now"}
      </Button>

      {/* Expandable content */}
      {hasExpandableContent && (
        <Box sx={{ 
          mt: 1, 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Collapse 
            in={expanded} 
            collapsedSize={0}
            sx={{ 
              overflow: 'auto',
              maxHeight: expanded ? 250 : 0, // Increased max height when expanded
              transition: 'max-height 0.3s ease-in-out',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {getExpandableContent()}
            {renderCustomContent && renderCustomContent()}
          </Collapse>

          {/* Show more/less button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 'auto',
            pt: 1,
            position: 'relative',
            zIndex: 1,
            backgroundColor: theme.palette.background.paper,
            borderTop: !expanded ? `1px solid ${theme.palette.divider}` : 'none'
          }}>
            <Button 
              variant="text" 
              size="small" 
              onClick={toggleExpand}
              endIcon={
                expanded ? 
                <Iconify icon="eva:chevron-up-fill" width={16} height={16} /> : 
                <Iconify icon="eva:chevron-down-fill" width={16} height={16} />
              }
            >
              {expanded ? "Show Less" : "Show More"}
            </Button>
          </Box>
        </Box>
      )}

      {/* Custom content for non-expandable cards */}
      {!hasExpandableContent && renderCustomContent && (
        <Box sx={{ mt: 2 }}>
          {renderCustomContent()}
        </Box>
      )}
    </Card>
  )
}
