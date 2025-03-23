"use client"

import Grid from "@mui/material/Unstable_Grid2"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { CONFIG } from "src/config-global"
import { paths } from "src/routes/paths"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { DashboardContent } from "src/layouts/dashboard"
import { AnalyticsOrderTimeline } from "../analytics-order-timeline"
import { AnalyticsWidgetSummary } from "../analytics-widget-summary"

export function OverviewAnalyticsView({ caseNo, authority, application, onBack }) {
  console.log("application data", application)

  const handlePrintLogs = () => {
    console.log("Printing logs...")
    // Add your print logs logic here
  }

  // Define _analyticTasks based on backend data
  const _analyticTasks =
    application && application.comments && application.comments.length > 0
      ? application.comments.map((comment, index) => ({
          id: comment.id || index,
          name: comment.comment || "No comment text",
        }))
      : [
          {
            id: "no-comments",
            name: "No comments available for this application.",
          },
        ]

  // Add dummy time to each task exactly as in the original file

  // Get application status directly from the API data
  const getApplicationStatus = () => {
    if (!application || !application.status) {
      return "Pending"
    }

    return application.status
  }

  // Get application type with proper formatting
  const getApplicationType = () => {
    if (!application || !application.application_type) {
      return "Family Reunification"
    }
    return application.application_type
  }

  // Change the _timeline definition to include unique IDs
  const _timeline =
    application && application.comments && application.comments.length > 0
      ? application.comments.map((c, index) => ({
          id: c.id || `timeline-${index}`,
          subheader: "2-2",
          title: c.comments || "Status update",
          createdAt: c.created_at, // Add the created_at timestamp here
          comment: c.comment, // Add the comment field to pass to the timeline
          type:
            c.comments && c.comments.includes("approved")
              ? "order1"
              : c.comments && c.comments.includes("rejected")
                ? "order4"
                : "order3",
        }))
      : [
          {
            id: "timeline-empty",
            title: "Timeline empty",
            type: "order3",
          },
        ]

  return (
    <DashboardContent sx={{ px: 5 }}>
             <CustomBreadcrumbs
                        heading="Co-Applicant"
                        links={[
                          { name: 'Dashboard', href: paths.dashboard.root },
                          { name: 'Profile', href: paths.dashboard.user.root },
                          { name: 'Co-applicant' },
                        ]}
                        sx={{ mb: { xs: 3, md: 5 } }}
                      />
      <Grid container sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Grid xs={6}>
          <Typography variant="h4">Your Application Status</Typography>
        </Grid>
        <Grid xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onBack}>
            Back to Applications
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Application Type"
            total={getApplicationType()}
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />}
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
            sx={{ height: 220 }}

          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Gov Authority"
            total={authority === "Migrationsverket" ? "Migrations- verket" : authority || "Unknown"}
            color="secondary"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />}
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
            sx={{ height: 220 }}

          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Case No"
            total={caseNo || "N/A"}
            color="warning"
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />}
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
            sx={{ height: 220 }}

          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Status"
            total={getApplicationStatus()}
            color={
              getApplicationStatus() === "Approved"
                ? "success"
                : getApplicationStatus() === "Rejected"
                  ? "error"
                  : "warning"
            }
            icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-message.svg`} />}
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
            sx={{ height: 220 }}

          />

        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AnalyticsOrderTimeline title="Application Timeline" list={_timeline} />
        </Grid>
      </Grid>
    </DashboardContent>
  )
}

