import { CONFIG } from 'src/config-global';
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { ApplicationTable } from './ApplicationTable';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function ApplicationChoice() {
  const [selectedOption, setSelectedOption] = useState(null);

  if (selectedOption) {
    return <ApplicationTable authority={selectedOption} />;
  }

  const options = [
    {
      title: 'Migrationsverket',
      icon: `${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`,
      color: 'primary',
    },
    {
      title: 'Skatteverket',
      icon: `${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`,
      color: 'secondary',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        p: 3,
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your Application Portal
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Choose Authority to View Application Details
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.title}>
            <Card
              onClick={() => setSelectedOption(option.title)}
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
  );
}

