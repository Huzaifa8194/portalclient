import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Grid from '@mui/material/Unstable_Grid2';
import { CONFIG } from 'src/config-global';

import { DashboardContent } from 'src/layouts/dashboard';
import { useMockedUser } from 'src/auth/hooks';
import { SeoIllustration } from 'src/assets/illustrations';
import { AppWelcome } from 'src/sections/assessment/app-welcome';

import { AppWidgetHeading } from './app-widget-heading';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();
  const navigate = useNavigate();

  const buttonHeadings = [
    { title: 'Business Visa', color: 'primary', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Family Reunification', color: 'info', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Long term EU Status', color: 'success', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Student Visa', color: 'warning', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Visit Visa', color: 'error', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'Work Permit', color: 'secondary', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
    { title: 'All Assessment', color: 'info', icon: `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg` },
  ];
  const toCamelCase = (str) =>
    str
      .split(' ')
      .map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  
  const handleButtonClick = (title) => {
    const route = `${paths.dashboard[toCamelCase(title)]}`;
    navigate(route);
  };
  

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
          />
        </Grid>

        {buttonHeadings.map((heading, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <Box
              component="button"
              onClick={() => handleButtonClick(heading.title)}
              sx={{
                width: '100%',
                height: '100%',
                padding: 0,
                border: 'none',
                background: 'none',
                textAlign: 'inherit',
              }}
            >
              <AppWidgetHeading
                title={heading.title}
                color={heading.color}
                icon={heading.icon}
                sx={{
                  height: '100%',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
