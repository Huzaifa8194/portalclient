import React, { useState } from "react";
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
  TablePagination,
} from "@mui/material";

const visaFees = [
  { country: "Australia", visaType: "Visitor Visa", duration: "Up to 3, 6, or 12 months", feeAdults: "AUD 145–380", feeMinors: "AUD 145–150", notes: "Each applicant, including minors, requires a separate application." },
  { country: "Australia", visaType: "Electronic Travel Authority (ETA - 601)", duration: "Short-term (eligible countries)", feeAdults: "AUD 20 (service fee)", feeMinors: "AUD 20 (service fee)", notes: "For eligible passport holders." },
  { country: "Australia", visaType: "eVisitor (Subclass 651)", duration: "Up to 3 months (eligible countries)", feeAdults: "Free", feeMinors: "Free", notes: "Only available for eligible European passport holders." },
  { country: "Canada", visaType: "Visitor Visa (Temporary Resident Visa)", duration: "Single or Multiple Entry", feeAdults: "CAD 100", feeMinors: "CAD 100", notes: "Family rate: CAD 500 for 5+ applications submitted together." },
  { country: "Canada", visaType: "Electronic Travel Authorization (eTA)", duration: "Up to 6 months per visit", feeAdults: "CAD 7", feeMinors: "CAD 7", notes: "Required for eligible travelers, including minors." },
  { country: "New Zealand", visaType: "Visitor Visa", duration: "Up to 9 months", feeAdults: "NZD 211", feeMinors: "NZD 211", notes: "Minors must apply individually." },
  { country: "New Zealand", visaType: "New Zealand Electronic Travel Authority (NZeTA)", duration: "Up to 2 years (multiple entry)", feeAdults: "NZD 9 (app) or NZD 12 (web) + NZD 35 (IVL)", feeMinors: "NZD 9 (app) or NZD 12 (web) + NZD 35 (IVL)", notes: "Required for all travelers, including children." },
  { country: "United Kingdom", visaType: "Standard Visitor Visa (6 months)", duration: "Up to 6 months", feeAdults: "£115", feeMinors: "£115", notes: "Long-term visas (2, 5, or 10 years): £432, £771, £963 respectively." },
  { country: "United Kingdom", visaType: "Electronic Travel Authorization (ETA)", duration: "Up to 2 years", feeAdults: "£10", feeMinors: "£10", notes: "Required for all travelers, including minors." },
  { country: "United States", visaType: "Visitor Visa (B1/B2)", duration: "Up to 6 months per visit", feeAdults: "USD 185", feeMinors: "USD 185", notes: "Each child requires a separate application." },
  { country: "United States", visaType: "Electronic System for Travel Authorization (ESTA)", duration: "Up to 2 years (eligible countries)", feeAdults: "USD 21", feeMinors: "USD 21", notes: "Required for eligible travellers, including minors." },
];

const schengenFees = [
  { category: "Adults", fee: "€90", notes: "Standard fee for applicants aged 12 and above." },
  { category: "Children (ages 6–12)", fee: "€45", notes: "Reduced fee for minors." },
  { category: "Children under 6 years", fee: "Free", notes: "No visa application fee is required." },
  { category: "School children, students, and accompanying teachers", fee: "Free", notes: "A fee waiver applies if traveling for study or training purposes." },
  { category: "Researchers", fee: "Free", notes: "For those traveling for scientific research purposes." },
  { category: "Non-profit organization representatives (age 25 or less)", fee: "Free", notes: "For participation in seminars, conferences, or cultural/sports events." },
];

const FeeChart = () => {
  const theme = useTheme();
  const [visaPage, setVisaPage] = useState(0);
  const [visaRowsPerPage, setVisaRowsPerPage] = useState(5);
  const [schengenPage, setSchengenPage] = useState(0);
  const [schengenRowsPerPage, setSchengenRowsPerPage] = useState(5);

  const handleVisaPageChange = (event, newPage) => {
    setVisaPage(newPage);
  };

  const handleVisaRowsPerPageChange = (event) => {
    setVisaRowsPerPage(parseInt(event.target.value, 10));
    setVisaPage(0);
  };

  const handleSchengenPageChange = (event, newPage) => {
    setSchengenPage(newPage);
  };

  const handleSchengenRowsPerPageChange = (event) => {
    setSchengenRowsPerPage(parseInt(event.target.value, 10));
    setSchengenPage(0);
  };

  const customLabelDisplayedRows = ({ from, to, count }) => `${from}–${to} of ${count}`;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
      <Card
        sx={{
          width: "100%",
          overflow: "hidden",
          mb: 4,
          borderRadius: '8px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h5"
            sx={{
              p: 3,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Visa Fee Chart
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Visa Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Fee (Adults)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Fee (Minors)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visaFees
                  .slice(visaPage * visaRowsPerPage, visaPage * visaRowsPerPage + visaRowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover } }}>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>{row.visaType}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                      <TableCell>{row.feeAdults}</TableCell>
                      <TableCell>{row.feeMinors}</TableCell>
                      <TableCell>{row.notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={visaFees.length}
            rowsPerPage={visaRowsPerPage}
            page={visaPage}
            onPageChange={handleVisaPageChange}
            onRowsPerPageChange={handleVisaRowsPerPageChange}
            labelRowsPerPage="Rows per page:"
            labelDisplayedRows={customLabelDisplayedRows}
            sx={{ mt: 2,  }}
          />
        </CardContent>
      </Card>

      <Card
        sx={{
          width: "100%",
          overflow: "hidden",
      
          
          borderRadius: '8px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h5"
            sx={{
              p: 3,
            
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Schengen Visa Fee Chart
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Fee</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schengenFees
                  .slice(schengenPage * schengenRowsPerPage, schengenPage * schengenRowsPerPage + schengenRowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover } }}>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.fee}</TableCell>
                      <TableCell>{row.notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={schengenFees.length}
            rowsPerPage={schengenRowsPerPage}
            page={schengenPage}
            onPageChange={handleSchengenPageChange}
            onRowsPerPageChange={handleSchengenRowsPerPageChange}
            labelRowsPerPage="Rows per page:"
            labelDisplayedRows={customLabelDisplayedRows}
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeeChart;