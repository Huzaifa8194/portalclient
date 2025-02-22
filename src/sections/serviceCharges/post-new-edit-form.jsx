import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  Box,
  TablePagination,
} from '@mui/material';

const serviceData = [
  {
    category: 'FAMILY REUNIFICATION',
    services: [
      { code: 'A11', name: 'Destination Services (SSN-Bank Account-Other Registration)', price: '12 000 SEK' },
      { code: 'A12', name: 'A11 + Visit Visa for Spouse', price: '18 500 SEK' },
      { code: 'A13', name: 'Sweden EU Residence Card', price: '35 000 SEK' },
      { code: 'A14', name: 'A13 + Nordic Permit', price: '37 500 SEK' },
      { code: 'A15', name: 'EU Residence card-Family', price: '50 000 SEK' },
      { code: 'A16', name: 'Nordic Permit Family up to 4 Children', price: '35 000 SEK' },
      { code: 'A17', name: 'Denmark EU Return', price: '30 000 SEK' },
      { code: 'A18', name: 'Denmark EU Return up to 4 Children', price: '40 000 SEK' },
      { code: 'FRSN0232', name: 'Family Reunification Sweden (National Laws)', price: '35 000 SEK' },
      { code: 'SF0012', name: 'Schengen-Joining a Family Member', price: '12 500 SEK' },
      { code: 'MEU200438', name: 'Parents EU Residence -Minor EU Child', price: '50 000 SEK' },
      { code: 'EULR1265', name: 'EU 2004/38 EU Family Case with other history', price: '50 000 SEK' },
    ],
  },
  {
    category: 'APPEAL CASES',
    services: [
      { code: 'D21', name: 'Student-Appeal Individual', price: '10 000 SEK' },
      { code: 'D22', name: 'Student-Appeal with Family upto 4 children', price: '15 000 SEK' },
      { code: 'DKAP011', name: 'Denmark EU -Return', price: '15 000 SEK' },
      { code: 'EURPX1', name: 'EU Family Residence Permit/Card', price: '20 000 SEK' },
      { code: 'EUX2', name: 'Individual-EU Long-Term', price: '30 000 SEK' },
      { code: 'SC125', name: 'Appeal for Swedish Citizenship', price: '10 000 SEK' },
      { code: 'SR01', name: 'Schengen Visa Refusal -Appeal', price: '12 500 SEK' },
      { code: 'WPA112', name: 'Work/Self Employed Permit-Appeal Individual', price: '20 000 SEK' },
      { code: 'WPA113', name: 'Work/Self Employed Permit-Appeal Family upto 4 children', price: '40 000 SEK' },
    ],
  },
  {
    category: 'EU LONG TERM PERMITS',
    services: [
      { code: 'E31', name: 'Long Term (Ist Time)', price: '20 000 SEK' },
      { code: 'E32', name: 'EU Long Term with Family', price: '30 000 SEK' },
      { code: 'E33', name: 'EU Long Term (After Refusal)', price: '25 000 SEK' },
      { code: 'E34', name: 'EU Long Term Family (After Refusal)', price: '30 000 SEK' },
      { code: 'E35', name: 'EU Long Term Permanent', price: '35 000 SEK' },
      { code: 'E36', name: 'Long Term EU-Permanent with Family', price: '50 000 SEK' },
      { code: 'E37', name: 'EU Long Term Status (Family more than 5 members)', price: '75 000 SEK' },
    ],
  },
  {
    category: 'WORK PERMIT',
    services: [
      { code: 'W41', name: 'Work Permit', price: '30 000 SEK' },
      { code: 'W42', name: 'Work Permit with Family', price: '40 000 SEK' },
      { code: 'W43', name: 'Work Permit + Housing', price: '45 000 SEK' },
      { code: 'W44', name: 'WP Spouse Application', price: '15 000 SEK' },
      { code: 'WPA01', name: 'Work Permit (After Asylum)', price: '30 000 SEK' },
      { code: 'WP44', name: 'Work Permit Extension', price: '30 000 SEK' },
      { code: 'WPF231', name: 'WP-Family Upto 2 children', price: '30 000 SEK' },
      { code: 'WEP232', name: 'WP Extension-Permanent Residence Permit', price: '30 000 SEK' },
      { code: 'WS52', name: 'Job Searching Permit-9 Months', price: '15 000 SEK' },
      { code: 'AP01', name: 'AU Pair', price: '30 000 SEK' },
      { code: 'BR01', name: 'Berry Pickers-Seasonal Workers', price: '15 000 SEK' },
      { code: 'ACRE05', name: 'Athlete- Coaches-Researcher-EU Blue Card', price: '30 000 SEK' },
      { code: 'EWP231', name: 'Extension of Work Permit', price: '24 500 SEK' },
      { code: 'PWP031', name: 'Pre-Work Permit Process For Employer', price: '12 500 SEK' },
    ],
  },
  {
    category: 'BUSINESS PERMIT',
    services: [
      { code: 'B1', name: 'Business Permit with Follow up', price: '50 000 SEK' },
      { code: 'BPR010', name: 'Permanent on Business permit', price: '40 000 SEK' },
      { code: 'BRPF01', name: 'Business Permit Family upto 2 Children', price: '75 000 SEK' },
      { code: 'SE0797', name: 'Self-Employed Permit: Appeal - Customized Follow-Up Process', price: '40 000 SEK' },
    ],
  },
  {
    category: 'COMPANY REGISTRATION',
    services: [
      { code: 'C1', name: 'Company Registration EF HB KB AB', price: '10 000 SEK' },
      { code: 'C2', name: 'Company Address Cost', price: '3 000 SEK' },
      { code: 'C3', name: 'C1+Company Account', price: '15 000 SEK' },
      { code: 'C4', name: 'Company Bank Account', price: '03 500 SEK' },
    ],
  },
  {
    category: 'GENERAL VISIT VISAS ON NON-EUROPEAN PASSPORTS',
    services: [
      { code: 'V1', name: 'General Visit (UK-Canada-Aus-NZ-USA)', price: '15 000 SEK' },
      { code: 'V2', name: 'Schengen Visit/EEA/EU from Outside Europe', price: '12 500 SEK' },
      { code: 'VF1', name: 'V1 + Family', price: '25 000 SEK' },
      { code: 'VF2', name: 'V2 + Family', price: '15 000 SEK' },
      { code: 'LVP012', name: 'Visit Permit upto 12 Months', price: '10 000 SEK' },
    ],
  },
  {
    category: 'PERMANENT RESIDENCE AND PASSPORT APPLICATION',
    services: [
      { code: 'P1', name: 'Permanent Residence After Work Permit', price: '22 500 SEK' },
      { code: 'P2', name: 'Passport Application -Follow up', price: '10 000 SEK' },
      { code: 'P3', name: 'Permanent Residence after EU Card', price: '25 000 SEK' },
      { code: 'P4', name: 'Permanent Residence after Nordic Permit', price: '10 000 SEK' },
      { code: 'PRG01', name: 'Regain Permanent Residence', price: '30 000 SEK' },
      { code: 'SCF2143', name: 'Swedish Citizenship With Family (Upto 4 child)', price: '30 000 SEK' },
    ],
  },
  {
    "category": "STUDENT APPLICATION",
    "services": [
      { "code": "ST1", "name": "Student Admission (Includes Fee)", "price": "5 000 SEK" },
      { "code": "ST2", "name": "Student individual Permit (Excl. Visa Fee)", "price": "15 000 SEK" },
      { "code": "ST3", "name": "ST Family", "price": "20 000 SEK" },
      { "code": "EUF021", "name": "Application Fee Eu Universities", "price": "1 800 SEK" }
    ]
  },
  {
    "category": "HOUSING SOLUTIONS",
    "services": [
      { "code": "HSL10", "name": "Long Term Rental or Bostadrätt Solution", "price": "60 000 SEK" },
      { "code": "HSL11", "name": "Limited Housing Solution", "price": "25 000 SEK" },
      { "code": "HSL12", "name": "Short Term Solution", "price": "10 000 SEK" },
      { "code": "HSL13", "name": "Shared Space", "price": "5 000 SEK" },
      { "code": "HSL14", "name": "Instant Housing Solutions", "price": "40 000 SEK" }
    ]
  },
  {
    "category": "OTHERS",
    "services": [
      { "code": "MRG200", "name": "Marriage Registration Process", "price": "10 000 SEK" },
      { "code": "DVR201", "name": "Divorce Registration Process", "price": "20 000 SEK" },
      { "code": "DKR001", "name": "Re-Entry Permit Denmark", "price": "10 000 SEK" },
      { "code": "CPRDK01", "name": "CPR Registration Denmark", "price": "10 000 SEK" },
      { "code": "RLP01", "name": "Relocation Package", "price": "75 000 SEK" },
      { "code": "AHF219", "name": "Application Fee and Health Insurance Fee", "price": "5 000 SEK" },
      { "code": "EUC032", "name": "EU Certificate Denmark", "price": "7 500 SEK" },
      { "code": "SRC01", "name": "Customised Relocation Package Sweden", "price": "50 000 SEK" },
      { "code": "RS01", "name": "Rental Services", "price": "10 000 SEK" },
      { "code": "DPR01", "name": "Deposit-One month Rent", "price": "30 000 SEK" },
      { "code": "ITS021", "name": "IT-Solution Per Hour", "price": "22 500 SEK" },
      { "code": "HIS01", "name": "AU Pair Health Insurance", "price": "6 200 SEK" },
      { "code": "FLUA1", "name": "Folkuniversitetet Swedish A1 Fee", "price": "4 895 SEK" },
      { "code": "MGRAUF01", "name": "AU Pair Application Fee Migrationsverket", "price": "1 500 SEK" },
      { "code": "DKEUF01", "name": "DK-EU Combine application Fee (Family)", "price": "3 280 SEK" },
      { "code": "EULTC321", "name": "EU Long-Term (Correspondence)", "price": "15 000 SEK" },
      { "code": "EUSKV012", "name": "Child Registration & EU Citizenship", "price": "15 000 SEK" },
      { "code": "ELPRK01", "name": "EL & Parking (June 2024-Dec 2024)", "price": "3 308 SEK" },
      { "code": "DS160", "name": "US DS160 Application Fee", "price": "2 000 SEK" },
      { "code": "DKDST01", "name": "Destination Services (SSN-Bank Account-Other Registration)", "price": "16 000 SEK" },
      { "code": "MVF01", "name": "Application Fee Migrationsverket", "price": "2 250 SEK" },
      { "code": "SKVT2135", "name": "Assistance in other Services", "price": "20 000 SEK" },
      { "code": "HR0231", "name": "Home Rent Måbärsgatan 2 Malmö", "price": "5 000 SEK" },
      { "code": "HR0232", "name": "Rent for Gustaf Pålssons väg 32 Oxie", "price": "5 000 SEK" },
      { "code": "CUS01", "name": "Company Registration+Bank Account & other Services", "price": "12 500 SEK" },
      { "code": "RS011", "name": "Rent-Sallerupsvägen 28D Malmö", "price": "10 750 SEK" },
      { "code": "SCHN201", "name": "Schengen Visa Fee", "price": "895 SEK" },
      { "code": "SISBR0122", "name": "Assistance in SIS Ban Removal Application", "price": "10 000 SEK" }
    ]
  }

];

export function PostNewEditForm() {
  const [paginationState, setPaginationState] = useState(
    serviceData.reduce((acc, category, index) => {
      acc[index] = { page: 0, rowsPerPage: 5 };
      return acc;
    }, {})
  );


  const handleChangePage = (index, newPage) => {
    setPaginationState((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], page: newPage },
    }));
  };


  const handleChangeRowsPerPage = (index, event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPaginationState((prevState) => ({
      ...prevState,
      [index]: { page: 0, rowsPerPage: newRowsPerPage },
    }));
  };


  const customLabelDisplayedRows = ({ from, to, count }) => `${from}–${to} of ${count}`;

  return (
    <Box sx={{ p: 3 }}>
      {/* <Typography variant="h4" sx={{ mb: 3 , textTransform: 'uppercase', letterSpacing: '1px',}}>
        Service Pricing Table
      </Typography> */}

      {serviceData.map((category, index) => {
        const { page, rowsPerPage } = paginationState[index];

        return (
          <Card
            key={index}
            sx={{
              mb: 4,
              p: 3,
              boxShadow: 3,
              borderLeft: '6px solid', // Use primary color for the border
              borderColor: 'primary.main',
              borderRadius: '8px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {category.category}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' , color : "primary.main" }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' , color : "primary.main" }}>Service Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' , color : "primary.main" }}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.services
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((service, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{service.code}</TableCell>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>


            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={category.services.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => handleChangePage(index, newPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(index, event)}
              labelRowsPerPage="Rows per page:"
              labelDisplayedRows={customLabelDisplayedRows}
              sx={{ mt: 2 }}
            />
          </Card>
        );
      })}
    </Box>
  );
  
}