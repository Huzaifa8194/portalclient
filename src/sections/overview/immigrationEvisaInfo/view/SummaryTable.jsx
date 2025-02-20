import React, { useState } from "react";
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
  TableHead, 
  Paper,
  useTheme,
  TablePagination,
} from "@mui/material";

function SummaryTable() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const data = [
    { country: "United States", type: "ESTA", eligibility: "Visa Waiver Program countries" },
    { country: "Australia", type: "ETA", eligibility: "Select Asian, North American, and European countries" },
    { country: "Canada", type: "ETA", eligibility: "Most European countries, Australia, Japan, South Korea, and more" },
    { country: "New Zealand", type: "NZeTA", eligibility: "Visa-exempt countries (including EU, UK, USA, Canada, etc.)" },
    { country: "United Kingdom", type: "ETA", eligibility: "GCC countries (Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, UAE)" },
    { country: "India, UAE, Kenya, Turkey, etc.", type: "eVisa", eligibility: "Depends on the country; generally broader eligibility compared to ETA or ESTA" },
  ];

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
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
            Visa Authorization Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: 'primary.main' }}>Eligibility</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
                      }}
                    >
                      <TableCell>{row.country}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.eligibility}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows per page:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default SummaryTable;