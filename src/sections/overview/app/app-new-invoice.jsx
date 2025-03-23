import React from "react"
import Card from "@mui/material/Card"
import Table from "@mui/material/Table"
import Button from "@mui/material/Button"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import CardHeader from "@mui/material/CardHeader"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"

import { fDate } from "src/utils/format-time"
import { fCurrency } from "src/utils/format-number"

import { Label } from "src/components/label"
import { TableHeadCustom } from "src/components/table"
import { Iconify } from "src/components/iconify"

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "invoiceNumber", label: "Invoice Number" },
  { id: "paymentMethod", label: "Payment Method" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "deadline", label: "Deadline" },
  { id: "actions", label: "Actions" },
]

export function AppNewInvoice({ title, tableData, sx = {}, ...other }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [expanded, setExpanded] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handlePayNow = (invoiceNumber) => {
    console.log(`Pay Now clicked for invoice ${invoiceNumber}`)
    // Implement payment logic here
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ height: '100%', ...sx }} {...other}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />

            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.invoiceNumber}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>{fCurrency(row.amount)}</TableCell>
                  <TableCell>
                    <Label
                      variant="soft"
                      color={
                        row.status === "paid"
                          ? "success"
                          : row.status === "pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {row.status}
                    </Label>
                  </TableCell>
                  <TableCell>{fDate(row.deadline)}</TableCell>
                  <TableCell>
                    {row.status === "pending" && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handlePayNow(row.invoiceNumber)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Card>
  )
}