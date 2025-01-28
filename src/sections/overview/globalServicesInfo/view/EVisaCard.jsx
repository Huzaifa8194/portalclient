import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.12)',
  }
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  '&.MuiChip-colorSuccess': {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
  '&.MuiChip-colorWarning': {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  },
  '&.MuiChip-colorError': {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  },
}));

const DownloadIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EVisaCard = ({ visa }) => (
  <StyledCard sx={{ mb: 2 }}>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              {visa.country} eVisa
            </Typography>
            <StyledChip
              label={visa.status}
              color={
                visa.status === 'APPROVED'
                  ? 'success'
                  : visa.status === 'PENDING'
                  ? 'warning'
                  : 'error'
              }
              size="small"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2" color="text.secondary">
            EVisa ID
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {visa.id}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Files
          </Typography>
          <Box>
            {visa.files.map((file, index) => (
              <Chip
                key={index}
                label={file}
                variant="outlined"
                size="small"
                onDelete={() => {}}
                deleteIcon={<DownloadIcon />}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </StyledCard>
);

export default EVisaCard;

