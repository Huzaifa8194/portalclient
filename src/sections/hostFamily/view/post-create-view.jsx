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
        heading="Host Family"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Au Pair', href: paths.dashboard.auPair },
          { name: 'Host Family' },


        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
  <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="We will carefully review our database to identify suitable au pairs that align with your request and collaborate with our trusted partner to ensure the best possible match. Additionally, we will provide comprehensive support throughout the entire immigration and relocation process for your au pair, ensuring a smooth and hassle-free experience. Upon completion of this process and our follow-up with you, a handling fee of €100 will be applicable. For a detailed overview of our service fees, please refer to the Service Charges section"
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}
