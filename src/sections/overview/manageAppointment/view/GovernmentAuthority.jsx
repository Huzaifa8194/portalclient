"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Card from "@mui/material/Card"
import Table from "@mui/material/Table"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Tooltip from "@mui/material/Tooltip"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import Grid from "@mui/material/Grid"
import CardContent from "@mui/material/CardContent"

import { varAlpha } from "src/theme/styles"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { Iconify } from "src/components/iconify"
import { Scrollbar } from "src/components/scrollbar"
import { Label } from "src/components/label"
import { paths } from "src/routes/paths"
import { DashboardContent } from "src/layouts/dashboard"

// Table head configuration
const TABLE_HEAD = [
  { id: "authority", label: "Authority" },
  { id: "service", label: "Service" },
  { id: "reference", label: "Reference No" },
  { id: "date", label: "Appointment Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", align: "right" },
]

// Dummy data for appointments
const DUMMY_APPOINTMENTS = [
  {
    id: 1,
    authority_name: "Migration Agency",
    service_name: "Residence Permit",
    reference_no: "GA-2023-001",
    appointment_date: "2023-05-15",
    status: "passed",
  },
  {
    id: 2,
    authority_name: "Tax Agency",
    service_name: "Personal Number",
    reference_no: "GA-2023-002",
    appointment_date: "2023-06-20",
    status: "passed",
  },
  {
    id: 3,
    authority_name: "Police Authority",
    service_name: "ID Card",
    reference_no: "GA-2023-003",
    appointment_date: "2023-08-10",
    status: "passed",
  },
  {
    id: 4,
    authority_name: "Migration Agency",
    service_name: "Work Permit",
    reference_no: "GA-2023-004",
    appointment_date: "2023-12-05",
    status: "due",
  },
  {
    id: 5,
    authority_name: "Social Insurance",
    service_name: "Health Insurance",
    reference_no: "GA-2023-005",
    appointment_date: "2023-12-15",
    status: "due",
  },
  {
    id: 6,
    authority_name: "Bank Authority",
    service_name: "Bank Account",
    reference_no: "GA-2023-006",
    appointment_date: "2023-12-20",
    status: "due",
  },
]

// Analytic component for appointments
function AppointmentAnalytic({ title, total, icon, color, percent }) {
  return (
    <Stack spacing={2.5} direction="row" alignItems="center" justifyContent="center" sx={{ width: 1, minWidth: 200 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ position: "relative" }}>
        <Iconify icon={icon} width={32} sx={{ color, position: "absolute" }} />

        <CircularProgress size={56} thickness={2} value={percent} variant="determinate" sx={{ color, opacity: 0.48 }} />

        <CircularProgress
          size={56}
          value={100}
          thickness={3}
          variant="determinate"
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: "absolute",
            color: (theme) => varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>

        <Box component="span" sx={{ color: "text.disabled", typography: "body2" }}>
          {total} appointments
        </Box>
      </Stack>
    </Stack>
  )
}

// Detail view component
function AppointmentDetailView({ appointment, onBack }) {
  return (
    <Box sx={{ padding: "20px 24px" }}>
      <CustomBreadcrumbs
        heading="Appointment Details"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "Government Authority", href: "#" },
          { name: "Appointment Details" },
        ]}
        action={
          <IconButton onClick={onBack}>
            <Iconify icon="eva:arrow-back-fill" />
          </IconButton>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Authority
              </Typography>
              <Typography variant="body2" paragraph>
                {appointment.authority_name}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Service
              </Typography>
              <Typography variant="body2" paragraph>
                {appointment.service_name}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Reference Number
              </Typography>
              <Typography variant="body2" paragraph>
                {appointment.reference_no}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Appointment Date
              </Typography>
              <Typography variant="body2" paragraph>
                {appointment.appointment_date}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Status
              </Typography>
              <Label variant="soft" color={appointment.status === "passed" ? "success" : "warning"}>
                {appointment.status === "passed" ? "Passed" : "Due"}
              </Label>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export function GovernmentAuthorityComponent() {
  const theme = useTheme()
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [statusFilter, setStatusFilter] = useState("all")

  // Check if appointment is passed (before current date) or due (future date)
  const isAppointmentPassed = (appointmentDate) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to beginning of day for fair comparison
    const appDate = new Date(appointmentDate)
    return appDate < today
  }

  // Filter appointments based on status
  const filteredAppointments = DUMMY_APPOINTMENTS.filter((app) => {
    if (statusFilter === "all") return true
    return app.status === statusFilter
  })

  // Sort appointments by date (earliest first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(a.appointment_date)
    const dateB = new Date(b.appointment_date)
    return dateA - dateB // Ascending order (earliest first)
  })

  // Get appointment count by status
  const getPassedAppointments = () => DUMMY_APPOINTMENTS.filter((app) => app.status === "passed").length

  const getDueAppointments = () => DUMMY_APPOINTMENTS.filter((app) => app.status === "due").length

  // Calculate percentage
  const getPercentByStatus = (count) => (DUMMY_APPOINTMENTS.length ? (count / DUMMY_APPOINTMENTS.length) * 100 : 0)

  // Define tabs for filtering
  const TABS = [
    { value: "all", label: "All", color: "default", count: DUMMY_APPOINTMENTS.length },
    { value: "passed", label: "Passed", color: "success", count: getPassedAppointments() },
    { value: "due", label: "Due", color: "warning", count: getDueAppointments() },
  ]

  const handleViewClick = (appointment) => {
    setSelectedAppointment(appointment)
  }

  const handleBack = () => {
    setSelectedAppointment(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterStatus = (event, newValue) => {
    setStatusFilter(newValue)
    setPage(0)
  }

  if (selectedAppointment) {
    return <AppointmentDetailView appointment={selectedAppointment} onBack={handleBack} />
  }

  return (
    <DashboardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "common.white",
          p: 3,
        }}
      >
        <CustomBreadcrumbs
          heading="Government Authority Appointments"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Application Status" },
            { name: "Government Authority Appointment" },
          ]}
          sx={{ mb: { xs: 3, md: 3 } }}
        />

        {/*  */}

        {/* Analytics Section */}
        <Card sx={{ mb: { xs: 3, md: 5 } }}>
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: "dashed" }} />}
              sx={{ py: 2 }}
            >
              <AppointmentAnalytic
                title="Total"
                total={DUMMY_APPOINTMENTS.length}
                percent={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.vars.palette.info.main}
              />

              <AppointmentAnalytic
                title="Passed"
                total={getPassedAppointments()}
                percent={getPercentByStatus(getPassedAppointments())}
                icon="solar:file-check-bold-duotone"
                color={theme.vars.palette.success.main}
              />

              <AppointmentAnalytic
                title="Due"
                total={getDueAppointments()}
                percent={getPercentByStatus(getDueAppointments())}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.vars.palette.warning.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        {/* Table Card */}
        <Card>
          {/* Status Tabs */}
          <Tabs
            value={statusFilter}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={((tab.value === "all" || tab.value === statusFilter) && "filled") || "soft"}
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          {/* Table */}
          <Scrollbar sx={{ minHeight: 400 }}>
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.align || "left"} sx={{ typography: "subtitle2" }}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedAppointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((app) => (
                    <TableRow
                      key={app.id}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          typography: "body2",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                            color: theme.vars.palette.primary.main,
                          },
                        }}
                        onClick={() => handleViewClick(app)}
                      >
                        {app.authority_name}
                      </TableCell>
                      <TableCell sx={{ typography: "body2" }}>{app.service_name}</TableCell>
                      <TableCell sx={{ typography: "body2" }}>{app.reference_no}</TableCell>
                      <TableCell sx={{ typography: "body2" }}>{app.appointment_date}</TableCell>
                      <TableCell>
                        <Label variant="soft" color={app.status === "passed" ? "success" : "warning"}>
                          {app.status === "passed" ? "Passed" : "Due"}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton onClick={() => handleViewClick(app)}>
                            <Iconify icon="eva:eye-fill" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={sortedAppointments.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>
    </DashboardContent>
  )
}

