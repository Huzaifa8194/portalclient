import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';

import { AppTopRelated } from '../app-top-related';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AppTopInstalledCountries } from '../app-top-installed-countries';
import { AppWidgetHeading } from '../app-widget-heading';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();


  const buttonHeadings = [
    'Business Visa',
    'Family Reunification',
    'Long term EU Status',
    'Student Visa',
    'Visit Visa',
    'Work Permit',
    'All Assessment',
  ];

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
              heading="Assessment"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Assessment'  },
              ]}
              sx={{ mb: { xs: 3, md: 5 } }}
            />

      <Grid container spacing={3}>
        {buttonHeadings.map((heading, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <AppWidgetHeading
              title={heading}
              sx={{
                height: '100%',
                color: theme.palette.text.secondary,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}

