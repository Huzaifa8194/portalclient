import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';

export default function CoApplicantProfile({ applicantData, open, onClose }) {
  // Use the data directly from applicantData without any transformation
  const details = [
    { 
      label: 'NIC', 
      value: applicantData.nic, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    { 
      label: 'Date of Birth', 
      value: applicantData.dob, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    { 
      label: 'Passport', 
      value: applicantData.passport, 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="12" cy="10" r="3"></circle>
          <path d="M12 13v8"></path>
          <path d="M8 21h8"></path>
        </svg>
      )
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {`Co-Applicant: ${applicantData.name}`}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {details.map((detail) => (
              <Grid xs={12} md={4} key={detail.label}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1,
                        bgcolor: 'primary.lighter',
                        color: 'primary.main',
                        mr: 2
                      }}
                    >
                      {detail.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {detail.label}
                      </Typography>
                      <Typography variant="h6">
                        {detail.value}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Avatar
                src={applicantData.picture}
                alt={applicantData.name}
                sx={{ width: 64, height: 64, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{applicantData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {applicantData.relation}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" paragraph>
              This section displays the co-applicant&apos;s information. You can view the details but cannot edit them here.
            </Typography>

            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <Typography variant="subtitle2">Name:</Typography>
                <Typography variant="body2">{applicantData.name}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography variant="subtitle2">Relation:</Typography>
                <Typography variant="body2">{applicantData.relation}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography variant="subtitle2">NIC:</Typography>
                <Typography variant="body2">{applicantData.nic}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography variant="subtitle2">Date of Birth:</Typography>
                <Typography variant="body2">{applicantData.dob}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography variant="subtitle2">Passport Number:</Typography>
                <Typography variant="body2">{applicantData.passport}</Typography>
              </Grid>
            </Grid>
          </Card>
        </>
      </DialogContent>
    </Dialog>
  );
}

