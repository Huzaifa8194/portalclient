import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { applications } from 'src/_mock/_applications';
import { OverviewAnalyticsView } from './overview-analytics-view'

export function ApplicationTable({ authority }) {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const filteredApplications = applications[authority] || [];

  const handleViewClick = (caseNo, govAuthority) => {
    setSelectedApplication({ caseNo, authority: govAuthority });
  };

  const handleBack = () => {
    setSelectedApplication(null);
  };

  if (selectedApplication) {
    return (
      <OverviewAnalyticsView 
        caseNo={selectedApplication.caseNo} 
        authority={selectedApplication.authority}
        onBack={handleBack}
      />
    );
  }

  return (
    <Box sx={{ padding: '20px 24px' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Application Details for {authority}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="application table">
          <TableHead>
            <TableRow>
              <TableCell>Application Type</TableCell>
              <TableCell>Gov Authority</TableCell>
              <TableCell>Case No</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((app, index) => (
              <TableRow key={index}>
                <TableCell>{app["Application Type"]}</TableCell>
                <TableCell>{app["Gov Authority"]}</TableCell>
                <TableCell>{app["Case No"]}</TableCell>
                <TableCell>{app["Registration Date"]}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    onClick={() => handleViewClick(app["Case No"], app["Gov Authority"])}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

