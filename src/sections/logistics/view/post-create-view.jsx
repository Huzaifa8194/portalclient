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
        heading="Logistics Solution"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Logistics Solution' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
  <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="We forward your inquiry to multiple partner companies, and you will receive quotes directly from them based on your request. To prevent unnecessary inquiries and ensure efficient processing, a €100 handling fee is charged at the end of the form."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}
