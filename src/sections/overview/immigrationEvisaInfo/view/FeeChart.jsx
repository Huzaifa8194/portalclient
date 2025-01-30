import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";

const visaFees = [
  { country: "United States", program: "ESTA", localFee: "$21 USD", usdFee: "$21", validity: "2 years or until passport expiry" },
  { country: "Canada", program: "eTA", localFee: "$7 CAD", usdFee: "~$5", validity: "5 years or until passport expiry" },
  { country: "Australia", program: "eVisitor/ETA", localFee: "$20 AUD", usdFee: "~$13", validity: "12 months or until passport expiry" },
  { country: "United Kingdom", program: "ETA", localFee: "£10", usdFee: "~$12", validity: "2 years" },
  { country: "Sri Lanka", program: "ETA (Tourist - Single Entry)", localFee: "$20 USD", usdFee: "$20", validity: "30 days" },
  { country: "Sri Lanka", program: "ETA (Tourist - Double Entry)", localFee: "$35 USD", usdFee: "$35", validity: "30 days" },
  { country: "India", program: "eVisa (Tourist - 30 Days)", localFee: "$10 USD (Apr-Jun) / $25 USD (Jul-Mar)", usdFee: "$10/$25", validity: "30 days" },
  { country: "India", program: "eVisa (Tourist - 1 Year)", localFee: "$40 USD", usdFee: "$40", validity: "1 year, multiple entries" },
  { country: "Turkey", program: "eVisa", localFee: "$50 USD", usdFee: "$50", validity: "180 days, multiple entries" },
  { country: "New Zealand", program: "NZeTA", localFee: "$17 NZD (App) / $23 NZD (Online)", usdFee: "~$10-$15", validity: "2 years" },
  { country: "Vietnam", program: "eVisa", localFee: "$25 USD", usdFee: "$25", validity: "30 days, single entry" },
  { country: "Malaysia", program: "eVisa", localFee: "105 MYR", usdFee: "~$24", validity: "30 days" },
  { country: "Cambodia", program: "eVisa", localFee: "$36 USD", usdFee: "$36", validity: "30 days" },
  { country: "Singapore", program: "eVisa", localFee: "$30 SGD", usdFee: "~$22", validity: "30 days" },
  { country: "Thailand", program: "eVisa", localFee: "$35 USD", usdFee: "$35", validity: "30 days" },
  { country: "Russia", program: "eVisa", localFee: "$40 USD", usdFee: "$40", validity: "16 days" }
];

const FeeChart = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h5"
            sx={{ p: 3, backgroundColor: 'black', color: 'white' }}
          >
            ETA & ESTA Fee Chart
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Program</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Fee (Local Currency)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Fee (Approx. USD)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Validity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visaFees.map((row, index) => (
                  <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover } }}>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.program}</TableCell>
                    <TableCell>{row.localFee}</TableCell>
                    <TableCell>{row.usdFee}</TableCell>
                    <TableCell>{row.validity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeeChart;
