import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Grid from '@mui/material/Unstable_Grid2';
import { DashboardContent } from 'src/layouts/dashboard';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';
import { useMockedUser } from 'src/auth/hooks';
import { SeoIllustration } from 'src/assets/illustrations';
import Button from '@mui/material/Button';
import { AppWelcome } from '../../../sections/entrepenaur/app-welcome';
import { AppWidgetHeading } from '../../../sections/entrepenaur/app-widget-heading';

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

