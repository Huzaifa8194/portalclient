import { paths } from 'src/routes/paths';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { SeoIllustration } from 'src/assets/illustrations';
import { AppWelcome } from '../app-welcome';

import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Investors"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Business', href: paths.dashboard.post.root },
          { name: ' Investors' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
   <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="Fill this form and submit only if you are an investor who want to be part of an active business or wants to invest on Entreprenuer ideas. We can help you to find the right properties to invest in. This service is paid to avoid unnecessary queries."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>

      <PostNewEditForm />
    </DashboardContent>
  );
}
