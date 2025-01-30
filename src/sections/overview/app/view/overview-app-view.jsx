import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import Grid from "@mui/material/Unstable_Grid2"
import { DashboardContent } from "src/layouts/dashboard"
import { SeoIllustration, AvatarShape } from "src/assets/illustrations"
import { _appAuthors, _appRelated, _appFeatured, _appInstalled } from "src/_mock"
import { svgColorClasses } from "src/components/svg-color"
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
import { AppWidgetButton } from "../app-widget-button"

import { AppWidget } from "../app-widget"
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

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Welcome\n ${user?.displayName} 👋`}
            description="This all-in-one platform streamlines immigration and relocation worldwide for you and your family."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Co-applicants"
            total={5}
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Documents"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
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
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center" }}>
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

            <Box sx={{ py: 2 }}>
              <Button variant="contained" onClick={() => handleViewClick("Not Assigned", "Migrationsverket")}>
                View Details
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppDirectMessages title="Direct Messages" subheader="Recent messages from your contacts" />
        </Grid>

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="Invoices"
            tableData={_appInvoices}
            tableLabels={[
              { id: "invoiceNumber", label: "Invoice Number" },
              { id: "paymentMethod", label: "Payment Method" },
              { id: "amount", label: "Amount" },
              { id: "status", label: "Status" },
              { id: "deadline", label: "Deadline" },
              { id: "action", label: "Action" },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Related applications" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Referrals" list={_appAuthors} />
        </Grid>
        <Grid xs={12} md={6} lg={4} sx={{ mb: 3 }}>
  <AppWidgetButton
    title="Host Family"
    icon="fluent:people-community-24-filled"
    onClick={handleHostFamilyClick}
    sx={{
      bgcolor: "info.dark",
      color: "info.light",
      mb: 2, // Added margin-bottom to create spacing
    }}
  />
  <AppWidgetButton
    title="I am au pair"
    icon="mdi:account-child-outline"
    onClick={handleAuPairClick}
    sx={{
      bgcolor: "success.dark",
      color: "success.light",
    }}
  />
</Grid>

      </Grid>
    </DashboardContent>
  )
}

