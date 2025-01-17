import { paths } from 'src/routes/paths';
import Box from '@mui/material/Box';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { SeoIllustration } from 'src/assets/illustrations';
import Grid from '@mui/material/Unstable_Grid2';
import { CONFIG } from 'src/config-global';
import { CourseWidgetSummary } from 'src/sections/overview/course/course-widget-summary';
import { useRouter } from 'src/routes/hooks';

import { AppWelcome } from '../app-welcome';

import { PostNewEditForm } from '../post-new-edit-form';


// ----------------------------------------------------------------------

export function PostCreateView() {
    const router = useRouter();
  
    const handleHostFamilyClick = () => {
      router.push(paths.dashboard.hostFamily);
    };
  
    const handleIAmAuPairClick = () => {
      router.push(paths.dashboard.iAmAuPair);
    };
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="AU Pair"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Au Pair' },
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
        <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              },
            }}
          >
          <CourseWidgetSummary
  title="Host Family"
  icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
  sx={{
    height: "100%",
    p: 6,
    cursor: "pointer", // Makes it act like a button
    "&:hover": {
      backgroundColor: "lightgrey", // Changes background to light grey on hover
    },
  }}
  onClick= {handleHostFamilyClick}
/>

<CourseWidgetSummary
  title="I am Au Pair"
  color="success"
  icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-completed.svg`}
  sx={{
    height: "100%",
    p: 6,
    cursor: "pointer", // Makes it act like a button
    "&:hover": {
      backgroundColor: "lightgrey", // Changes background to light grey on hover
    },
  }}
  onClick={handleIAmAuPairClick}

/>

          </Box>

    </DashboardContent>
  );
}
