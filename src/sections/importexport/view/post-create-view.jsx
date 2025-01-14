import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { SeoIllustration } from 'src/assets/illustrations';
import Grid from '@mui/material/Unstable_Grid2';

import { AppWelcome } from '../app-welcome';
import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Import-Export Services"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Business', href: paths.dashboard.post.root },
          { name: ' Import-Export Services' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
      <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="Fill this form and submit only if you want to import/export services for Europe. We even deal on behalf of your company and can be your legal representative in the region. This service is paid to avoid unnecessary queries."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>

      <PostNewEditForm />
    </DashboardContent>
  );
}
