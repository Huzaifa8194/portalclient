import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Grid from '@mui/material/Unstable_Grid2';
import { CONFIG } from 'src/config-global';

import { DashboardContent } from 'src/layouts/dashboard';
import { useMockedUser } from 'src/auth/hooks';
import { SeoIllustration } from 'src/assets/illustrations';
import Button from '@mui/material/Button';
import { AppWelcome } from 'src/sections/assessment/app-welcome'

import { AppWidgetHeading } from './app-widget-heading';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const buttonHeadings = [
    { title: 'Business Visa', color: 'primary', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Family Reunification', color: 'info', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Long term EU Status', color: 'success', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Student Visa', color: 'warning', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Visit Visa', color: 'error', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Work Permit', color: 'secondary', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'All Assessment', color: 'info', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
  ];

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Assessment"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Assessment' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={4}>
        <Grid xs={12} md={12}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.displayName}`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<SeoIllustration hideBackground />}
            action={
              <Button variant="contained" color="primary">
                Go now
              </Button>
            }
          />
        </Grid>

        {buttonHeadings.map((heading, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <AppWidgetHeading
              title={heading.title}
              color={heading.color}
              icon={heading.icon}
              sx={{
                height: '100%',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
