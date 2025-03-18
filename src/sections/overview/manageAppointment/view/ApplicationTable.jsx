"use client"

import { useState, useEffect, useCallback } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Card from "@mui/material/Card"
import Table from "@mui/material/Table"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Tooltip from "@mui/material/Tooltip"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import LinearProgress from "@mui/material/LinearProgress"
import { useTheme } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"

import { varAlpha } from "src/theme/styles"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs"
import { Iconify } from "src/components/iconify"
import { Scrollbar } from "src/components/scrollbar"
import { Label } from "src/components/label"
import axios from "axios"
import { useAuthContext } from "src/auth/hooks"
import { OverviewAnalyticsView } from "./overview-analytics-view"

// Table head configuration
const TABLE_HEAD = [
  { id: 'category', label: 'Category' },
  { id: 'type', label: 'Type' },
  { id: 'invoice', label: 'Invoice No' },
  { id: 'date', label: 'Appointment Date' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

// Analytic component similar to InvoiceAnalytic but simplified for appointments
function AppointmentAnalytic({ title, total, icon, color, percent }) {
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 200 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} width={32} sx={{ color, position: 'absolute' }} />

        <CircularProgress
          size={56}
          thickness={2}
          value={percent}
          variant="determinate"
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          size={56}
          value={100}
          thickness={3}
          variant="determinate"
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>

        <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
          {total} appointments
        </Box>
      </Stack>
    </Stack>
  );
}

export function ApplicationTable() {
  const theme = useTheme()
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [statusFilter, setStatusFilter] = useState('all')

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get("https://api.swedenrelocators.se/api/appointment/list", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })

        // Check if data exists and has appointments
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          const appointmentsWithTimeSlotId = response.data.data.map((appointment) => ({
            ...appointment,
            time_slot_id: appointment.time_slot_id,
          }))

          setAppointments(appointmentsWithTimeSlotId)
        } else {
          setAppointments([])
        }
      } catch (err) {
        console.error("Error fetching appointments:", err)
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }

    if (user && user.accessToken) {
      fetchAppointments()
    }
  }, [user])

  const handleViewClick = (appointment) => {
    setSelectedApplication(appointment)
  }

  const handleBack = () => {
    setSelectedApplication(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterStatus = (event, newValue) => {
    setStatusFilter(newValue)
    setPage(0)
  }

  // Check if appointment is passed (before current date) or due (future date)
  const isAppointmentPassed = (appointmentDate) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to beginning of day for fair comparison
    const appDate = new Date(appointmentDate)
    return appDate < today
  }

  // Filter appointments based on status
  const filteredAppointments = appointments.filter(app => {
    if (statusFilter === 'all') return true
    if (statusFilter === 'passed') return isAppointmentPassed(app.appointment_date)
    if (statusFilter === 'due') return !isAppointmentPassed(app.appointment_date)
    return false
  })

  // Sort appointments by date (newest first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
  const dateA = new Date(a.appointment_date)
  const dateB = new Date(b.appointment_date)
  return dateA - dateB // Ascending order (earliest first)
})


  // Get appointment count by status
  const getPassedAppointments = () => 
    appointments.filter(app => isAppointmentPassed(app.appointment_date)).length

  const getDueAppointments = () => 
    appointments.filter(app => !isAppointmentPassed(app.appointment_date)).length

  // Calculate percentage
  const getPercentByStatus = (count) => 
    appointments.length ? (count / appointments.length) * 100 : 0

  // Define tabs for filtering
  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: appointments.length },
    { value: 'passed', label: 'Passed', color: 'success', count: getPassedAppointments() },
    { value: 'due', label: 'Due', color: 'warning', count: getDueAppointments() },
  ]

  if (selectedApplication) {
    return <OverviewAnalyticsView appointment={selectedApplication} onBack={handleBack} />
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          width: "100%",
          padding: "0 24px",
        }}
      >
        <Box sx={{ width: "50%", maxWidth: "400px" }}>
          <LinearProgress
            sx={{
              height: 4,
              borderRadius: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 1,
                backgroundColor: "#000",
              },
            }}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ padding: "20px 24px" }}>
      <CustomBreadcrumbs
        heading="Manage Appointments"
        links={[{ name: "Dashboard" }, { name: "Manage Appointments" }, { name: "Appointment Details" }]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
      
      {/* Analytics Section */}
      <Card sx={{ mb: { xs: 3, md: 5 } }}>
        <Scrollbar sx={{ minHeight: 108 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <AppointmentAnalytic
              title="Total"
              total={appointments.length}
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

      {appointments.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h5" color="textSecondary" align="center" gutterBottom>
            No Appointments Booked
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ maxWidth: 500, mb: 3 }}>
            You have not booked any appointments yet. When you book appointments, they will appear here.
          </Typography>
        </Box>
      ) : (
        <Card>
          {/* Status Tabs */}
          <Tabs
            value={statusFilter}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
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
                    variant={
                      ((tab.value === 'all' || tab.value === statusFilter) && 'filled') ||
                      'soft'
                    }
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
                      <TableCell 
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        sx={{ typography: 'subtitle2' }}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedAppointments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((app) => {
                      const isPassed = isAppointmentPassed(app.appointment_date)
                      return (
                        <TableRow
                          key={app.id}
                          hover
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell 
                            sx={{ 
                              typography: 'body2',
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: theme.vars.palette.primary.main,
                              }
                            }}
                            onClick={() => handleViewClick(app)}
                          >
                            {app.category_name}
                          </TableCell>
                          <TableCell sx={{ typography: 'body2' }}>{app.type_name}</TableCell>
                          <TableCell sx={{ typography: 'body2' }}>{app.invoice.invoice_no}</TableCell>
                          <TableCell sx={{ typography: 'body2' }}>{app.appointment_date}</TableCell>
                          <TableCell>
                            <Label
                              variant="soft"
                              color={isPassed ? 'success' : 'warning'}
                            >
                              {isPassed ? 'Passed' : 'Due'}
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
                      )
                    })}
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
      )}
    </Box>
  )
}