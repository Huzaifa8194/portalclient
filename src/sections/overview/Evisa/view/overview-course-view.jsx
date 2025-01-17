import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CONFIG } from 'src/config-global';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import EVisaCard from './EVisaCard';
import { CourseMyAccount } from '../course-my-account';
import { CourseReminders } from '../course-reminders';
import { CourseWidgetSummary } from '../course-widget-summary';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.12)',
  }
}));

export function OverviewCourseView() {
  const eVisaData = [
    {
      id: 'EV123456',
      country: 'United States',
      status: 'APPROVED',
      files: ['application.pdf', 'passport.jpg', 'photo.jpg'],
    },
    {
      id: 'EV789012',
      country: 'Canada',
      status: 'PENDING',
      files: ['application.pdf', 'travel_history.docx'],
    },
    {
      id: 'EV345678',
      country: 'Australia',
      status: 'DISAPPROVED',
      files: ['application.pdf', 'rejection_letter.pdf'],
    },
    {
      id: 'EV901234',
      country: 'United Kingdom',
      status: 'APPROVED',
      files: ['application.pdf', 'visa.pdf'],
    },
  ];

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
      <Box sx={{ mb: 5 }}>
        {/* <Typography variant="h4" gutterBottom>
          E-Visa Dashboard
        </Typography> */}
        <Typography color="text.secondary">
          View and manage your E-Visa applications
        </Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CourseWidgetSummary title="Total Applications" total="12" icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CourseWidgetSummary title="Approved" total="8" color="success" icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CourseWidgetSummary title="Pending" total="3" color="warning" icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CourseWidgetSummary title="Rejected" total="1" color="error" icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}/>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{mb:3}}>
                Your E-Visa Applications
              </Typography>
              {eVisaData.map((visa) => (
                <EVisaCard key={visa.id} visa={visa} />
              ))}
            </CardContent>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard>
                  <CourseMyAccount sx={{mt:5, py:2}} />
              </StyledCard>
            </Grid>
    
            <Grid item xs={12}>
              <StyledCard>
                  <CourseReminders sx={{p:3}}
                    title="Recent Updates"
                    list={[
                      {
                        id: '1',
                        title: 'USA Visa Approved',
                        description: 'Your USA visa application has been approved.',
                        time: '2 hours ago',
                      },
                      {
                        id: '2',
                        title: 'Canada Visa Processing',
                        description: 'Your Canada visa application is being processed.',
                        time: '1 day ago',
                      },
                      {
                        id: '3',
                        title: 'Australia Visa Rejected',
                        description: 'Your Australia visa application was not approved.',
                        time: '3 days ago',
                      },
                    ]}
                  />
              </StyledCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

