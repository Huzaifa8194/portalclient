import Box from '@mui/material/Box';
import { cardClasses } from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _coursesContinue, _coursesFeatured, _coursesReminder } from 'src/_mock';

import { CourseProgress } from '../course-progress';
import { CourseContinue } from '../course-continue';
import { CourseFeatured } from '../course-featured';
import { CourseReminders } from '../course-reminders';
import { CourseMyAccount } from '../course-my-account';
import { CourseHoursSpent } from '../course-hours-spent';
import { CourseMyStrength } from '../course-my-strength';
import { CourseWidgetSummary } from '../course-widget-summary';

export function OverviewCourseView() {
  const eVisaData = [
    {
      id: 'EV123456',
      country: 'United States',
      status: 'APPROVED',
      files: 'File'
    },
    {
      id: 'EV789012',
      country: 'Canada',
      status: 'PENDING',
      files: 'File'
    },
    {
      id: 'EV345678',
      country: 'Australia',
      status: 'DISAPPROVED',
      files: 'File'
    }
  ];

  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={{
        borderTop: (theme) => ({
          lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            minWidth: { lg: 0 },
            py: { lg: 3, xl: 5 },
            flexDirection: 'column',
            flex: { lg: '1 1 auto' },
            px: { xs: 2, sm: 3, xl: 5 },
            borderRight: (theme) => ({
              lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
            }),
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              E-Visa Status
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              View your E-Visa applications and their current status
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            {eVisaData.map((visa, index) => (
              <Box
                key={visa.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 2,
                  p: 2,
                  bgcolor: 'background.neutral',
                  borderRadius: 1,
                }}
              >
                <CourseWidgetSummary
                  title="eVisa ID"
                  total={visa.id}
                  color="primary"
                />
                <CourseWidgetSummary
                  title="Visa Country"
                  total={visa.country}
                  color="info"
                />
                <CourseWidgetSummary
                  title="Status"
                  total={visa.status}
                  color={visa.status === 'APPROVED' ? 'success' : visa.status === 'PENDING' ? 'warning' : 'error'}
                />
                <CourseWidgetSummary
                  title="Files"
                  total={visa.files}
                  color="secondary"
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'column',
            px: { xs: 2, sm: 3, xl: 5 },
            pt: { lg: 8, xl: 10 },
            pb: { xs: 8, xl: 10 },
            flexShrink: { lg: 0 },
            gap: { xs: 3, lg: 5, xl: 8 },
            maxWidth: { lg: 320, xl: 360 },
            bgcolor: { lg: 'background.neutral' },
            [`& .${cardClasses.root}`]: {
              p: { xs: 3, lg: 0 },
              boxShadow: { lg: 'none' },
              bgcolor: { lg: 'transparent' },
            },
          }}
        >
          <CourseMyAccount />

          <CourseMyStrength
            title="Application Status"
            chart={{
              categories: ['Submitted', 'Processing', 'Approved', 'Completed'],
              series: [{ data: [100, 80, 60, 40] }],
            }}
          />

          <CourseReminders 
            title="Recent Updates" 
            list={_coursesReminder} 
          />
        </Box>
      </Box>
    </DashboardContent>
  );
}

