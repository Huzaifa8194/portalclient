import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { SeoIllustration } from 'src/assets/illustrations';
import Grid from '@mui/material/Unstable_Grid2';

import { AppWelcome } from '../app-welcome';

import { PostNewEditForm} from '../post-new-edit-form';


// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Lawyer"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Lawyer' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
  <Grid xs={12} md={12}>
          <AppWelcome sx={{ mb: 3 }}
            title="Welcome back 👋 User"
            description="We specialize in immigration and relocation services, which are handled in-house. All other legal matters are referred to our partner lawyers, who will contact you directly. A €100 handling fee applies upon submission of this form."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}
