import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SeoIllustration } from 'src/assets/illustrations';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { AppWelcome } from './app-welcome';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(2),
  overflow: 'visible',
}));

const eVisaData = [
  {
    id: '1',
    country: 'United States',
    visaType: 'Tourist Visa',
    applicationDate: '2024-01-20 14:30',
    location: 'New York Visa Center, 123 Broadway St'
  },
  {
    id: '2',
    country: 'United Kingdom',
    visaType: 'Student Visa',
    applicationDate: '2024-02-15 10:45',
    location: 'London Application Centre, 45 Oxford Street'
  },
  {
    id: '3',
    country: 'Canada',
    visaType: 'Work Permit',
    applicationDate: '2024-03-01 09:15',
    location: 'Toronto Immigration Office, 789 Yonge St'
  }
];

const EVisaCard = ({ visa }) => (
  <StyledCard>
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography color="text.secondary" variant="subtitle2" gutterBottom>
            Visa Country
          </Typography>
          <Typography variant="body2">
            {visa.country}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <Typography color="text.secondary" variant="subtitle2" gutterBottom>
            Visa Type
          </Typography>
          <Typography variant="body2">
            {visa.visaType}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <Typography color="text.secondary" variant="subtitle2" gutterBottom>
            App. Date/Time
          </Typography>
          <Typography variant="body2">
            {visa.applicationDate}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <Typography color="text.secondary" variant="subtitle2" gutterBottom>
            App. Location
          </Typography>
          <Typography variant="body2">
            {visa.location}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </StyledCard>
);

export function OverviewCourseView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="E Visa"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'E-Visa' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
      <Grid xs={8} md={8}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="You can download your Visa file once it's complete from the backend. We book an appointment with FedEx/Gerrys/Embassy and update the Time and Location. All you have to do is to download and submit with your original passport. If you choose the DHL service then you will receive the file in 3 to 5 working days at your provided address."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
    

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          {eVisaData.map((visa) => (
            <EVisaCard key={visa.id} visa={visa} />
          ))}
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

