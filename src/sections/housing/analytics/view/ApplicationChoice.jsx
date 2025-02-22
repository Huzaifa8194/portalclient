import { CONFIG } from 'src/config-global';
import React, { useState } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { ApplicationTable } from './ApplicationTable';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function UserListView() {
  const [selectedOption, setSelectedOption] = useState(null);

  if (selectedOption) {
    return <ApplicationTable authority={selectedOption} />;
    
  }

  const options = [
    {
      title: '',
      value: 'Migrationsverket',
      icon: `${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`,
      color: 'primary',
    },
    {
      title: ""
       
      ,
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
          heading="Housing"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Housing' },
          ]}
          sx={{ mb: { xs: 3, md: 3 } }}
        />

        <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4} >
              <Card
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <AnalyticsWidgetSummary
                    title=''
                    total="Long Rental"
                    color="primary"
                    icon={<img alt="icon" src= {`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />}
                    chart={{
                      series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                    }}
                  />
                </CardContent>
                
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
              <Card
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <AnalyticsWidgetSummary
                    title=''
                    total="Short Rental"
                    color="secondary"
                    icon={<img alt="icon" src= {`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />}
                    chart={{
                      series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                    }}
                  />
                </CardContent>
                
              </Card>
            </Grid>
        </Grid>
      </Box>
    </DashboardContent>
  );
}

