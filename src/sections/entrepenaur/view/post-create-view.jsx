import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { SeoIllustration } from 'src/assets/illustrations';
import Grid from '@mui/material/Unstable_Grid2';

import { AppWelcome } from '../app-welcome';

import { PostNewEditForm } from '../post-new-edit-form';


// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading=" Entrepreneur"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Business', href: paths.dashboard.post.root },
          { name: ' Entrepreneur' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
  <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="Fill this form and submit only if you are an Entrepreneur or already have any Start-up. We will help you to expand your idea or business by providing you right investors. This service is paid to avoid unnecessary queries."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}
