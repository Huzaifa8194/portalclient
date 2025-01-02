import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import {
  _analyticTasks,
  _analyticOrderTimeline,
} from 'src/_mock';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function OverviewAnalyticsView({ caseNo, authority, onBack }) {
  const handlePrintLogs = () => {
    console.log('Printing logs...');
    // Add your print logs logic here
  };

  // Add dummy time to each task
  const tasksWithTime = _analyticTasks.map((task, index) => {
    const date = new Date();
    date.setHours(9 + index, Math.floor(Math.random() * 60), 0);
    return {
      ...task,
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  });

  return (
    <DashboardContent maxWidth="xl">
      <Grid container sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid item>
          <Typography variant="h4">
            Your Application Status
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onBack}>
            Back to Applications
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Application Type"
            total="Family Reunification"
            icon={
              <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Gov Authority"
            total={authority === 'Migrationsverket' ? 'Migrations- verket' : 'Skatteverket'}
            color="secondary"
            icon={
              <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Case No"
            total={caseNo}
            color="warning"
            icon={
              <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Status"
            total="Pending"
            color="error"
            icon={
              <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-message.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Comments</Typography>
            <Button variant="contained" onClick={handlePrintLogs}>
              Print Logs
            </Button>
          </Box>
          <AnalyticsTasks
            list={tasksWithTime.map(task => ({
              ...task,
              content: (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <Typography variant="body2">{task.content}</Typography>
                  <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                    {task.time}
                  </Typography>
                </Box>
              ),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Assessment Timeline" list={_analyticOrderTimeline} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

