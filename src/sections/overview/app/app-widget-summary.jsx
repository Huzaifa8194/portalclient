"use client"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Avatar from "@mui/material/Avatar" // Added Avatar import
import Stack from "@mui/material/Stack" // Added Stack import
import { CONFIG } from "src/config-global"
import { _mock } from "src/_mock" // Added _mock import
import { fNumber } from "src/utils/format-number"
import { useNavigate } from "react-router-dom"
import { Chart, useChart } from "src/components/chart"
import { Iconify } from "src/components/iconify"
import { FileStorageOverview } from "src/sections/file-manager/file-storage-overview"
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
  initialExpanded = false,
  onToggleExpand,
  displayContent = false, // New prop to control if content is displayed
  onToggleDisplayContent, // New prop to toggle display content
  ...other
}) {
  const theme = useTheme()
  const [showDropdown, setShowDropdown] = useState(true) // Default to true to show content
  const [showDocs, setShowDocs] = useState(true) // Default to true to show content
  const [tabIndex, setTabIndex] = useState(0)
  const [expanded, setExpanded] = useState(initialExpanded)

  // Update expanded state when initialExpanded prop changes
  useEffect(() => {
    setExpanded(initialExpanded)
  }, [initialExpanded])

  const dummyCoApplicants = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "David Brown"]
  const dummyDocuments = [
    { name: "Obaid", count: 54 },
    { name: "Aisha", count: 32 },
    { name: "Rahul", count: 21 },
    { name: "Sophia", count: 40 },
    { name: "Liam", count: 15 },
  ]

  const chartColors = chart?.colors ?? [theme.palette.primary.main]

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart?.categories },
    tooltip: {
      y: { formatter: (value) => fNumber(value), title: { formatter: () => "" } },
    },
    plotOptions: { bar: { borderRadius: 1.5, columnWidth: "64%" } },
    ...chart?.options,
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
    const newExpandedState = !expanded
    setExpanded(newExpandedState)

    // If user is collapsing and clicking "Show Less", hide the content completely
    if (!newExpandedState && onToggleDisplayContent) {
      onToggleDisplayContent()
    }

    if (onToggleExpand) {
      onToggleExpand(newExpandedState)
    }
  }

  // Determine if this card should have expandable content
  const hasExpandableContent = title === "Co-applicants" || title === "Documents" || title === "Appointment"

  const GB = 1000000000 * 24

  const renderStorageOverview = (
    <FileStorageOverview
      total={GB}
      chart={{ series: 76 }}
      data={[
        {
          name: "Images",
          usedStorage: GB / 2,
          filesCount: 223,
          icon: <Box component="img" src={`${CONFIG.assetsDir}/assets/icons/files/ic-img.svg`} />,
        },
        {
          name: "Media",
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`} />,
        },
        {
          name: "Documents",
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`} />,
        },
        {
          name: "Other",
          usedStorage: GB / 10,
          filesCount: 223,
          icon: <Box component="img" src={`${CONFIG.assetsDir}/assets/icons/files/ic-file.svg`} />,
        },
      ]}
    />
  )

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
      )
    }

    if (title === "Documents") {
      return renderStorageOverview
    }

    if (title === "Appointment") {
      return (
        <Box sx={{ mt: 2 }}>
          <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
            <Tab label="Sweden Relocators" />
            <Tab label="Authority" />
          </Tabs>
        </Box>
      )
    }

    return null
  }

  // Avatar component for co-applicants
  const renderAvatars = () => {
    const avatar1 = _mock.image.avatar(24)
    const avatar2 = _mock.image.avatar(4)
    const avatar3 = _mock.image.avatar(2)

    return (
      <Stack direction="row" spacing={-0.5}>
        <Avatar
          src={avatar1}
          alt="Co-applicant 1"
          sx={{ width: 32, height: 32, border: `1px solid ${theme.palette.background.paper}` }}
        />
        <Avatar
          src={avatar2}
          alt="Co-applicant 2"
          sx={{ width: 32, height: 32, border: `1px solid ${theme.palette.background.paper}` }}
        />
        <Avatar
          src={avatar3}
          alt="Co-applicant 3"
          sx={{ width: 32, height: 32, border: `1px solid ${theme.palette.background.paper}` }}
        />
      </Stack>
    )
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        height: "100%",
        position: "relative",
        ...sx,
      }}
      {...other}
    >
      {/* Header with title, total, and chart or avatars */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Box sx={{ typography: "subtitle2" }}>{title}</Box>
          <Box sx={{ mt: 1.5, typography: "h3" }}>{fNumber(total)}</Box>
        </Box>
        {title === "Co-applicants" ? (
          renderAvatars()
        ) : (
          <Chart type="bar" series={[{ data: chart?.series }]} options={chartOptions} width={60} height={40} />
        )}
      </Box>

      {/* Action button */}
      <Button
        variant="outlined"
        onClick={() => handleButtonClick(getPath(title))}
        sx={{
          mb: hasExpandableContent ? 2 : 0,
          maxWidth: "auto", // Decrease width
          mr: "auto", // Center horizontally
          display: "block", // Ensure it takes the full width for centering
        }}
      >
        {title === "Co-applicants"
          ? "Add Co-applicant"
          : title === "Documents"
            ? "Upload Document"
            : title === "Appointment"
              ? "Book Now"
              : "Go now"}
      </Button>

      {/* Display Content Button - Only show if content is not displayed */}
      {hasExpandableContent && !displayContent && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="text"
            size="small"
            onClick={onToggleDisplayContent}
            endIcon={<Iconify icon="eva:chevron-down-fill" width={16} height={16} />}
            sx={{
              maxWidth: "100%",
              px: 2,
              
            }}
          >
            Display Content
          </Button>
        </Box>
      )}

      {/* Expandable content - Only show if displayContent is true */}
      {hasExpandableContent && displayContent && (
        <Box
          sx={{
            mt: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Content with conditional height and scrollbar */}
          <Box
            sx={{
              overflow: "auto",
              maxHeight: expanded ? "150px" : "60px", // Show 60px when collapsed, 150px when expanded
              transition: "max-height 0.3s ease-in-out",
              mb: 1,
            }}
          >
            {getExpandableContent()}
            {renderCustomContent && renderCustomContent()}
          </Box>

          {/* Show more/less button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "auto",
              pt: 1,
              position: "relative",
              zIndex: 1,
              backgroundColor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              variant="text"
              size="small"
              onClick={expanded ? onToggleDisplayContent : toggleExpand}
              endIcon={
                expanded ? (
                  <Iconify icon="eva:chevron-up-fill" width={16} height={16} />
                ) : (
                  <Iconify icon="eva:chevron-down-fill" width={16} height={16} />
                )
              }
              sx={{
                maxWidth: "150px", // Decrease width
                px: 2, // Add some horizontal padding
              }}
            >
              {expanded ? "Show Less" : "Show More"}
            </Button>
          </Box>
        </Box>
      )}

      {/* Custom content for non-expandable cards */}
      {!hasExpandableContent && renderCustomContent && <Box sx={{ mt: 2 }}>{renderCustomContent()}</Box>}
    </Card>
  )
}
