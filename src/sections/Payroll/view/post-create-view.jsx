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
        heading=" Payroll Services"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Payroll', href: paths.dashboard.post.root },
         
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
  <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="Fill out this form and submit only if you require professional payroll services. We specialize in managing employee wages, taxes, and benefits, ensuring compliance and accuracy. Our services are provided by experienced payroll professionals and are available as a paid solution to streamline your payroll processing."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}
