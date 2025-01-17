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
        heading="I am Au Pair"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Au Pair', href: paths.dashboard.auPair },
          { name: 'I am AuPair'},

        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
  <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="We will review our database to identify suitable families based on your request and share the information with our partner to find the perfect match. Once we contact you with the results, a handling fee of €100 will be charged, as indicated at the end of the form. For more details about our service fees, please refer to the Service Charges section. We are here to support you throughout the entire immigration and relocation process."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}
