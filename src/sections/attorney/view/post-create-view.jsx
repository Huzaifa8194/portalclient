import { Typography, Divider, Box } from '@mui/material';
import { paths } from 'src/routes/paths';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { SeoIllustration } from 'src/assets/illustrations';
import Grid from '@mui/material/Unstable_Grid2';
import AppWelcome from '../app-welcome';
import PostNewEditForm from '../post-new-edit-form';

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Power of Attorney"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Attorney', href: paths.dashboard.post.root },
          { name: 'Form' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
      <Grid xs={12} md={12}>
        <AppWelcome
          sx={{ mb: 3 }}
          title="Welcome back 👋 User"
          description={
            <Box sx={{  mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Our Companies:
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" paragraph>
                <strong>Sweden Relocators AB</strong> (Org. No. 559025-2648)
              </Typography>
              <Typography variant="body2" paragraph>
                Address: Amiralsgatan 86E, 214 37 Malmö, Sweden
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" paragraph>
                <strong>Nordic Relocators:</strong> CVR 41200677
              </Typography>
              <Typography variant="body2">
                Address: Roskildevej 30B, 2620 Albertslund, Denmark
              </Typography>
            </Box>
          }
          img={<SeoIllustration hideBackground />}
        />
      </Grid>
      <PostNewEditForm />
    </DashboardContent>
  );
}