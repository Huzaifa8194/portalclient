import React from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  useTheme,
} from "@mui/material"

function SummaryTable() {
  const theme = useTheme()

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h5"
            sx={{ p: 3, backgroundColor: 'black', color: 'white' }}

          >
            Visa Authorization Summary
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableBody>
                {[
                  { country: "United States", type: "ESTA", eligibility: "Visa Waiver Program countries" },
                  {
                    country: "Australia",
                    type: "ETA",
                    eligibility: "Select Asian, North American, and European countries",
                  },
                  {
                    country: "Canada",
                    type: "ETA",
                    eligibility: "Most European countries, Australia, Japan, South Korea, and more",
                  },
                  {
                    country: "New Zealand",
                    type: "NZeTA",
                    eligibility: "Visa-exempt countries (including EU, UK, USA, Canada, etc.)",
                  },
                  {
                    country: "United Kingdom",
                    type: "ETA",
                    eligibility: "GCC countries (Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, UAE)",
                  },
                  {
                    country: "India, UAE, Kenya, Turkey, etc.",
                    type: "eVisa",
                    eligibility: "Depends on the country; generally broader eligibility compared to ETA or ESTA",
                  },
                ].map((row, index) => (
                  <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover } }}>
                    <TableCell sx={{ fontWeight: "bold" }}>{row.country}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.eligibility}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SummaryTable

