import { CONFIG } from 'src/config-global';
import React, { useState } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import scheduling from 'src/assets/images/scheduling.png'
import { ApplicationTable } from './ApplicationTable';
import { GovernmentAuthorityComponent } from './GovernmentAuthority';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function ApplicationChoice() {
  const [selectedOption, setSelectedOption] = useState(null);

  console.log('Currently selected option:', selectedOption);

  if (selectedOption === 'Migrationsverket') {
    return <ApplicationTable authority={selectedOption} />;
  }

  if (selectedOption === 'GovernmentAuthority') {
    return <GovernmentAuthorityComponent />;
  }

  const options = [
    {
      title: 'Appointment',
      value: 'Migrationsverket',
      total: 'Sweden Relocators',
      icon: scheduling,
      color: 'primary',
    },
    {
      title: 'Appointment',
      value: 'GovernmentAuthority',
      total: 'Government Authority',
      icon: scheduling,
      color: 'secondary',
    }
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
          {options.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.value}>
              <Card
                onClick={() => {
                  console.log(`Clicked on: ${option.value}`);
                  setSelectedOption(option.value);
                }}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.customShadows.z24,
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    p: 0,
                    '&:last-child': { pb: 0 },
                    height: '100%',
                    display: 'flex',
                    
                  }}
                >
                  <AnalyticsWidgetSummary
                    title={option.title}
                    total={option.total}
                    color={option.color}
                    icon={<img alt="icon" src={option.icon} />}
                    chart={{
                      series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                    }}
                    sx={{ 
                      height: '100%', 
                      width: '100%' 
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