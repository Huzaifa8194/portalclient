"use client"

import { useState, useCallback, useEffect } from "react"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2"
import Box from "@mui/material/Box"

import axios from "axios"
import { paths } from "src/routes/paths"
import { RouterLink } from "src/routes/components"

import { useBoolean } from "src/hooks/use-boolean"
import { useSetState } from "src/hooks/use-set-state"
import { useAuthContext } from "src/auth/hooks"

import { orderBy } from "src/utils/helper"
import { Typography, CircularProgress } from "@mui/material"
import { DashboardContent } from "src/layouts/dashboard"
import { _jobs } from "src/_mock"

import { Iconify } from "src/components/iconify"
import { EmptyContent } from "src/components/empty-content"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { toast } from "src/components/snackbar"

import { JobList } from "../job-list"
import { AppWidgetSummary } from "../app-widget-summary"
// ----------------------------------------------------------------------

export function JobListView() {
  const openFilters = useBoolean()
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthContext()
  const [coApplicantsCount, setCoApplicantsCount] = useState(0)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.accessToken) {
        try {
          const response = await axios.get("https://api.swedenrelocators.se/api/client/profile", {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          const userDataResponse = response.data.data
          console.log(userDataResponse)
          setUserData(userDataResponse)
        } catch (error) {
          console.error("Error fetching user data:", error)
          toast.error("Failed to fetch user data")
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [user])

  useEffect(() => {
    const fetchCoApplicants = async () => {
      if (user?.accessToken) {
        try {
          const response = await axios.get("https://api.swedenrelocators.se/api/client/familyMember/list", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            validateStatus: (status) => status >= 200 && status < 300,
          })

          // Set the count of co-applicants
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            setCoApplicantsCount(response.data.data.length)
          } else {
            setCoApplicantsCount(0)
          }
        } catch (error) {
          console.error("Error fetching co-applicants:", error)
          toast.error("Failed to fetch co-applicants data")
          setCoApplicantsCount(0)
        }
      }
    }

    fetchCoApplicants()
  }, [user])

  const [sortBy, setSortBy] = useState("latest")

  const search = useSetState({ query: "", results: [] })

  const filters = useSetState({
    roles: [],
    locations: [],
    benefits: [],
    experience: "all",
    employmentTypes: [],
  })

  const dataFiltered = applyFilter({ inputData: _jobs, filters: filters.state, sortBy })

  const canReset =
    filters.state.roles.length > 0 ||
    filters.state.locations.length > 0 ||
    filters.state.benefits.length > 0 ||
    filters.state.employmentTypes.length > 0 ||
    filters.state.experience !== "all"

  const notFound = !dataFiltered.length && canReset

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue)
  }, [])

  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue })

      if (inputValue) {
        const results = _jobs.filter((job) => job.title.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1)

        search.setState({ results })
      }
    },
    [search],
  )

  if (isLoading) {
    return (
      <DashboardContent>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    )
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Co-Applicant"
        links={[{ name: "Dashboard", href: paths.dashboard.root }, { name: "Profile" }, { name: "Co-Applicant" }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.job.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Co-Applicant
          </Button>
        }
        sx={{ mb: { xs: 0, md: 0 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 3 } }}>
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            mb: 3,
            mx: 0,
            textAlign: "left",
            backgroundColor: "text.primary",
            py: 1,
            px: 2,
            color: "white",
            borderRadius: 1,
            width: "fit-content",
          }}
        >
          Kindly add your family members here who are going to apply with you now or they are willing to apply in the
          future.
        </Typography>
      </Stack>

      {notFound && <EmptyContent filled sx={{ pt: 10 }} />}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} md={4} lg={4}>
          <AppWidgetSummary
            title="User ID:"
            codeicon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="#5ee943"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  color="#5ee943"
                >
                  <path d="M8.5 18c1.813-1.954 5.167-2.046 7 0m-1.56-6c0 1.105-.871 2-1.947 2c-1.075 0-1.947-.895-1.947-2s.872-2 1.947-2s1.948.895 1.948 2" />
                  <path d="M9.5 4.002c-2.644.01-4.059.102-4.975.97C3.5 5.943 3.5 7.506 3.5 10.632v4.737c0 3.126 0 4.69 1.025 5.66c1.025.972 2.675.972 5.975.972h3c3.3 0 4.95 0 5.975-.971c1.025-.972 1.025-2.535 1.025-5.66v-4.738c0-3.126 0-4.689-1.025-5.66c-.916-.868-2.33-.96-4.975-.97" />
                  <path d="M9.772 3.632c.096-.415.144-.623.236-.792a1.64 1.64 0 0 1 1.083-.793C11.294 2 11.53 2 12 2s.706 0 .909.047a1.64 1.64 0 0 1 1.083.793c.092.17.14.377.236.792l.083.36c.17.735.255 1.103.127 1.386a1.03 1.03 0 0 1-.407.451C13.75 6 13.332 6 12.498 6h-.996c-.834 0-1.252 0-1.533-.17a1.03 1.03 0 0 1-.407-.452c-.128-.283-.043-.65.127-.186z" />
                </g>
              </svg>
            }
            total={userData?.user?.id || "N/A"}
            extratext="Unique Identifier"
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>

        <Grid xs={12} md={3.8}>
          <AppWidgetSummary
            title="User Type"
            extratext="Basic User."
            total={userData?.profile?.user_type || "N/A"}
            codeicon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path
                  fill="#5ee943"
                  d="M14.94 19.5L12 17.77L9.06 19.5l.78-3.34l-2.59-2.24l3.41-.29L12 10.5l1.34 3.13l3.41.29l-2.59 2.24M20 2H4v2l4.86 3.64a8 8 0 1 0 6.28 0L20 4m-2 11a6 6 0 1 1-7.18-5.88a5.9 5.9 0 0 1 2.36 0A6 6 0 0 1 18 15m-5.37-8h-1.26l-4-3h9.34Z"
                />
              </svg>
            }
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Number of Co-Applicants"
            codeicon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path
                  fill="#5ee943"
                  d="M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z"
                />
                <path
                  fill="#5ee943"
                  d="M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5"
                />
              </svg>
            }
            total={coApplicantsCount.toString()}
            extratext="Number of your co-Applicants"
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>
      </Grid>

      <JobList />
    </DashboardContent>
  )
}

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { employmentTypes, experience, roles, locations, benefits } = filters

  // Sort by
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["createdAt"], ["desc"])
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["createdAt"], ["asc"])
  }

  if (sortBy === "popular") {
    inputData = orderBy(inputData, ["totalViews"], ["desc"])
  }

  // Filters
  if (employmentTypes.length) {
    inputData = inputData.filter((job) => job.employmentTypes.some((item) => employmentTypes.includes(item)))
  }

  if (experience !== "all") {
    inputData = inputData.filter((job) => job.experience === experience)
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.role))
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)))
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)))
  }

  return inputData
}

