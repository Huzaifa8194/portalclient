"use client"

import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Unstable_Grid2"
import { DashboardContent } from "src/layouts/dashboard"
import { SeoIllustration, AvatarShape } from "src/assets/illustrations"
import { _appAuthors, _appRelated, _appFeatured, _appInstalled } from "src/_mock"
import { useMockedUser } from "src/auth/hooks"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItemText"
import { Image } from "src/components/image"
import { varAlpha } from "src/theme/styles"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import { useState, useEffect, useRef } from "react"
import CardHeader from "@mui/material/CardHeader"
import { Iconify } from "src/components/iconify"
import { AppWidgetButton } from "../app-widget-button"
import { AppWelcome } from "../app-welcome"
import { AppFeatured } from "../app-featured"
import { AppNewInvoice } from "../app-new-invoice"
import { AppTopAuthors } from "../app-top-authors"
import { AppTopRelated } from "../app-top-related"
import { AppWidgetSummary } from "../app-widget-summary"
import { AppTopInstalledCountries } from "../app-top-installed-countries"
import { AppWidgetAppointment } from "../app-widget-appointment"
import { AppDirectMessages } from "../app-direct-messages"

// ----------------------------------------------------------------------

// Dummy appointment data
const dummyAppointment = {
  date: "2023-05-15",
  time: "14:30",
  country: "US",
}

const image =
  "https://i0.wp.com/picjumbo.com/wp-content/uploads/red-and-blue-pillars-wallpaper-abstract-background-free-image.jpeg?w=600&quality=80"

// Dummy invoice data
const _appInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    paymentMethod: "Credit Card",
    amount: 1500.0,
    status: "paid",
    deadline: "2023-06-15",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    paymentMethod: "PayPal",
    amount: 2300.5,
    status: "pending",
    deadline: "2023-06-20",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    paymentMethod: "Bank Transfer",
    amount: 1800.75,
    status: "overdue",
    deadline: "2023-06-10",
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    paymentMethod: "Credit Card",
    amount: 3200.0,
    status: "pending",
    deadline: "2023-06-25",
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    paymentMethod: "PayPal",
    amount: 950.25,
    status: "paid",
    deadline: "2023-06-18",
  },
]

export function OverviewAppView() {
  const { user } = useMockedUser()
  const theme = useTheme()

  // First, let's create a state to track the Business Permit Card height
  const [businessCardHeight, setBusinessCardHeight] = useState(0)
  const businessCardRef = useRef(null)

  // Add useEffect to measure and update the height
  useEffect(() => {
    const updateHeight = () => {
      if (businessCardRef.current) {
        const height = businessCardRef.current.clientHeight
        setBusinessCardHeight(height)
      }
    }

    // Initial measurement
    updateHeight()

    // Update on window resize
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  // State for expanded/collapsed content - all set to true by default
  const [expandedSections, setExpandedSections] = useState({
    messages: false,
    invoices: false,
    related: false,
    installed: false,
    authors: false,
  })

  // State for expanded summary widgets - all set to true by default
  const [expandedWidgets, setExpandedWidgets] = useState({
    coApplicants: true,
    documents: true,
    appointment: true,
  })

  // Toggle expanded state for a section
  const toggleExpand = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Toggle expanded state for a widget
  const toggleWidgetExpand = (widget) => {
    setExpandedWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }))
  }

  // Use dummy data if user.appointment is not available
  const appointment = user.appointment || dummyAppointment

  const handleViewClick = (status, agency) => {
    // Implement your view click handler here
    console.log(`View clicked for status: ${status}, agency: ${agency}`)
  }

  const handleHostFamilyClick = () => {
    console.log("Host Family button clicked")
    // Add your logic here
  }

  const handleAuPairClick = () => {
    console.log("I am au pair button clicked")
    // Add your logic here
  }

  // Common styles for grid items to ensure consistent heights
  const gridItemStyles = {
    display: "flex",
    flexDirection: "column",
  }

  // Row-specific heights - increased summaryRow height
  const rowHeights = {
    welcomeRow: "280px",
    summaryRow: "500px", // Increased from 450px to 500px to show more content
    contentRow: "auto",
    bottomRow: "320px",
  }

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* Welcome and Featured Row */}
        <Grid xs={12} md={8} sx={gridItemStyles}>
          <Box sx={{ height: rowHeights.welcomeRow, display: "flex", flexDirection: "column" }}>
            <AppWelcome
              title={`Welcome\n ${user?.displayName} 👋`}
              description="This all-in-one platform streamlines immigration and relocation worldwide for you and your family."
              img={<SeoIllustration hideBackground />}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

        <Grid xs={12} md={4} sx={gridItemStyles}>
          <Box sx={{ height: rowHeights.welcomeRow, display: "flex", flexDirection: "column" }}>
            <AppFeatured list={_appFeatured} sx={{ flex: 1 }} />
          </Box>
        </Grid>

        {/* Summary Widgets Row - with increased height and default expanded state */}
        <Grid xs={12} md={4} sx={gridItemStyles}>
          <Box sx={{ height: rowHeights.summaryRow, display: "flex", flexDirection: "column" }}>
            <AppWidgetSummary
              title="Co-applicants"
              total={5}
              chart={{
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                series: [15, 18, 12, 51, 68, 11, 39, 37],
              }}
              initialExpanded={expandedWidgets.coApplicants}
              onToggleExpand={() => toggleWidgetExpand("coApplicants")}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

        <Grid xs={12} md={4} sx={gridItemStyles}>
          <Box sx={{ height: rowHeights.summaryRow, display: "flex", flexDirection: "column" }}>
            <AppWidgetSummary
              title="Documents"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.vars.palette.info.main],
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                series: [20, 41, 63, 33, 28, 35, 50, 46],
              }}
              initialExpanded={expandedWidgets.documents}
              onToggleExpand={() => toggleWidgetExpand("documents")}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

        <Grid xs={12} md={4} sx={gridItemStyles}>
          <Box sx={{ height: rowHeights.summaryRow, display: "flex", flexDirection: "column" }}>
            <AppWidgetAppointment
              title="Appointment"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.vars.palette.error.main],
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                series: [18, 19, 31, 8, 16, 37, 12, 33],
              }}
              appointment={appointment}
              initialExpanded={expandedWidgets.appointment}
              onToggleExpand={() => toggleWidgetExpand("appointment")}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

        {/* Business Permit Card */}
        <Grid xs={12} sm={6} md={4} sx={gridItemStyles}>
          <Card
            ref={businessCardRef}
            sx={{
              textAlign: "center",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <AvatarShape
                sx={{
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  mx: "auto",
                  bottom: -26,
                  position: "absolute",
                }}
              />

              <Avatar
                alt="Business Permit"
                src="/static/images/avatar_placeholder.png"
                sx={{
                  width: 64,
                  height: 64,
                  zIndex: 11,
                  left: 0,
                  right: 0,
                  bottom: -32,
                  mx: "auto",
                  position: "absolute",
                }}
              />

              <Image
                src={image || "/placeholder.svg"}
                alt="Cover"
                ratio="16/9"
                slotProps={{
                  overlay: {
                    bgcolor: (themeParam) => varAlpha(themeParam.vars.palette.common.blackChannel, 0.48),
                  },
                }}
              />
            </Box>

            <ListItemText
              sx={{ mt: 7, mb: 1 }}
              primary="Business Permit"
              secondary="Migrationsverket"
              primaryTypographyProps={{ typography: "subtitle1" }}
              secondaryTypographyProps={{ component: "span", mt: 0.5 }}
            />

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
              <Typography variant="body2" color="textSecondary">
                <strong>Case No:</strong> N/A
              </Typography>
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 3, typography: "subtitle1" }}>
              <div>
                <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Registration Date
                </Typography>
                2023-02-16
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Status
                </Typography>
                Pending
              </div>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            {/* <Box sx={{ py: 2, mt: "auto" }}>
              <Button variant="contained" onClick={() => handleViewClick("Not Assigned", "Migrationsverket")}>
                View Details
              </Button>
            </Box> */}
          </Card>
        </Grid>

        {/* Direct Messages */}
        <Grid xs={12} md={6} lg={8} sx={gridItemStyles}>
          <Card
            sx={{
              height: businessCardHeight > 0 ? `${businessCardHeight}px` : "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Direct Messages"
              subheader="Recent messages from your contacts"
              action={
                <Button variant="text" size="small" onClick={() => toggleExpand("messages")}>
                  {expandedSections.messages ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show Less <Iconify icon="eva:chevron-up-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show More <Iconify icon="eva:chevron-down-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  )}
                </Button>
              }
            />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: expandedSections.messages ? "auto" : "auto",
                  maxHeight: expandedSections.messages ? "none" : "none",
                }}
              >
                <AppDirectMessages
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Invoices */}
        <Grid xs={12} lg={8} sx={gridItemStyles}>
          <Card
            sx={{
              height: rowHeights.bottomRow,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Invoices"
              action={
                <Button variant="text" size="small" onClick={() => toggleExpand("invoices")}>
                  {expandedSections.invoices ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show Less <Iconify icon="eva:chevron-up-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show More <Iconify icon="eva:chevron-down-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  )}
                </Button>
              }
            />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: expandedSections.invoices ? "auto" : "hidden",
                  maxHeight: expandedSections.invoices ? "none" : "220px",
                }}
              >
                <AppNewInvoice
                  tableData={_appInvoices}
                  tableLabels={[
                    { id: "invoiceNumber", label: "Invoice Number" },
                    { id: "paymentMethod", label: "Payment Method" },
                    { id: "amount", label: "Amount" },
                    { id: "status", label: "Status" },
                    { id: "deadline", label: "Deadline" },
                    { id: "action", label: "Action" },
                  ]}
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Related Applications */}
        <Grid xs={12} md={6} lg={4} sx={gridItemStyles}>
          <Card
            sx={{
              height: rowHeights.bottomRow,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Related applications"
              action={
                <Button variant="text" size="small" onClick={() => toggleExpand("related")}>
                  {expandedSections.related ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show Less <Iconify icon="eva:chevron-up-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show More <Iconify icon="eva:chevron-down-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  )}
                </Button>
              }
            />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: expandedSections.related ? "auto" : "hidden",
                  maxHeight: expandedSections.related ? "none" : "220px",
                }}
              >
                <AppTopRelated
                  list={_appRelated}
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Top Installed Countries */}
        <Grid xs={12} md={6} lg={4} sx={gridItemStyles}>
          <Card
            sx={{
              height: rowHeights.bottomRow,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Top installed countries"
              action={
                <Button variant="text" size="small" onClick={() => toggleExpand("installed")}>
                  {expandedSections.installed ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show Less <Iconify icon="eva:chevron-up-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show More <Iconify icon="eva:chevron-down-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  )}
                </Button>
              }
            />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: expandedSections.installed ? "auto" : "hidden",
                  maxHeight: expandedSections.installed ? "none" : "220px",
                }}
              >
                <AppTopInstalledCountries
                  list={_appInstalled}
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Referrals */}
        <Grid xs={12} md={6} lg={4} sx={gridItemStyles}>
          <Card
            sx={{
              height: rowHeights.bottomRow,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Referrals"
              action={
                <Button variant="text" size="small" onClick={() => toggleExpand("authors")}>
                  {expandedSections.authors ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show Less <Iconify icon="eva:chevron-up-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Show More <Iconify icon="eva:chevron-down-fill" width={16} height={16} sx={{ ml: 0.5 }} />
                    </Box>
                  )}
                </Button>
              }
            />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: expandedSections.authors ? "auto" : "hidden",
                  maxHeight: expandedSections.authors ? "none" : "220px",
                }}
              >
                <AppTopAuthors
                  list={_appAuthors}
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Widget Buttons */}
        <Grid xs={12} md={6} lg={4} sx={{ ...gridItemStyles, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <AppWidgetButton
              title="Host Family"
              icon="fluent:people-community-24-filled"
              onClick={handleHostFamilyClick}
              sx={{
                bgcolor: "info.dark",
                color: "info.light",
                mb: 2,
                flex: 1,
              }}
            />
            <AppWidgetButton
              title="I am au pair"
              icon="mdi:account-child-outline"
              onClick={handleAuPairClick}
              sx={{
                bgcolor: "success.dark",
                color: "success.light",
                flex: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  )
}

