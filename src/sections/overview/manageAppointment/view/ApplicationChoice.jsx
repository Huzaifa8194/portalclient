import { CONFIG } from 'src/config-global';
import React, { useState } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { ApplicationTable } from './ApplicationTable';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function ApplicationChoice() {
  const [selectedOption, setSelectedOption] = useState(null);

  if (selectedOption) {
    return <ApplicationTable authority={selectedOption} />;
    
  }

  const options = [
    {
      title: 'Government Authority Appointment',
      value: 'Migrationsverket',
      icon: `${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`,
      color: 'primary',
    },
    {
      title: (
        <>
          Sweden Relocator Appointment
        </>
      ),
      value: 'Skatteverket',
      icon: `${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`,
      color: 'secondary',
    },
  ];
  

  return (
    <DashboardContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'common.white',
          p: 3,
        }}
      >
        <CustomBreadcrumbs
          heading="Application Status"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Application Status' },
            { name: 'Application Type' },
          ]}
          sx={{ mb: { xs: 3, md: 3 } }}
        />

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {options.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={option.title}>
              <Card
                onClick={() => setSelectedOption(option.value)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.customShadows.z24,
                  },
                  ...(index === 1 && {
                    backgroundColor: (theme) => theme.palette.secondary.lighter,
                    '& .MuiTypography-root': {
                      color: (theme) => theme.palette.secondary.darker,
                    },
                  }),
                }}
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <AnalyticsWidgetSummary
                    title={option.title}
                    total="Select"
                    color={option.color}
                    icon={<img alt="icon" src={option.icon} />}
                    chart={{
                      series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardContent>
  );
}

