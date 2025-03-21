"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItemText"
import Container from "@mui/material/Container"
import { Image } from "src/components/image"
import { varAlpha } from "src/theme/styles"
import { AvatarShape } from "src/assets/illustrations"
import { toast } from "src/components/snackbar"
import { OverviewAnalyticsView } from "./overview-analytics-view"

export function ApplicationTable() {
  const image =
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/red-and-blue-pillars-wallpaper-abstract-background-free-image.jpeg?w=600&quality=80"
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("authToken")
        if (!token) {
          throw new Error("No authentication token found")
        }

        const response = await axios.get("https://api.swedenrelocators.se/api/client/application/status/list", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        console.log("Applications data:", response.data.data)

        if (response.data && Array.isArray(response.data.data)) {
          setApplications(response.data.data)
        } else {
          console.error("Invalid data format received:", response.data)
          toast.error("Invalid data format received from server")
          setApplications([]) // Set to empty array to prevent rendering issues
        }
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast.error(error?.response?.data?.message || "Failed to load applications")
        setApplications([]) // Set to empty array to prevent rendering issues
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  // Modified to pass the entire application object
  const handleViewClick = (application) => {
    setSelectedApplication(application)
  }

  const handleBack = () => {
    setSelectedApplication(null)
  }

  if (selectedApplication) {
    return (
      <OverviewAnalyticsView
        caseNo={selectedApplication.case_number}
        authority={selectedApplication.government_authority}
        application={selectedApplication}
        onBack={handleBack}
      />
    )
  }

  // Format date to show only the date part (not time)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return dateString.split(" ")[0] // Split at space and take the first part (date)
  }

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Typography variant="body1" sx={{textAlign: "center" }}>
          Loading applications...
        </Typography>
      ) : applications.length === 0 ? (
        <Typography variant="body1" sx={{textAlign: "center" }}>
          No applications found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {applications.map((app, index) => (
            <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
              <Card sx={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
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
                    alt={app.application_type || "Application"}
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
                        bgcolor: (theme) => varAlpha(theme.vars.palette.common.blackChannel, 0.48),
                      },
                    }}
                  />
                </Box>

                <ListItemText
                  sx={{ mt: 7, mb: 1 }}
                  primary={app.application_type || "Unknown Application Type"}
                  secondary={app.government_authority || "Unknown Authority"}
                  primaryTypographyProps={{ typography: "subtitle1" }}
                  secondaryTypographyProps={{ component: "span", mt: 0.5 }}
                />

                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Case No:</strong> {app.case_number === null ? "N/A" : app.case_number}
                  </Typography>
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 3, typography: "subtitle1" }}>
                  <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                      Created at
                    </Typography>
                    {formatDate(app.created_at)}
                  </div>

                  <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: "text.secondary" }}>
                      Country
                    </Typography>
                    {app.country || "N/A"}
                  </div>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Box sx={{ py: 2, mt: "auto" }}>
                  <Button variant="contained" onClick={() => handleViewClick(app)}>
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

