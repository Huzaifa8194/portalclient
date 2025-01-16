import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { SeoIllustration } from 'src/assets/illustrations';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { AppWelcome } from '../app-welcome';

// ----------------------------------------------------------------------

export function PostCreateView() {
  const router = useRouter();

  const handleComplaintClick = () => {
    router.push(paths.dashboard.complaint);
  };

  const handleExperienceClick = () => {
    router.push(paths.dashboard.experience);
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Feedback"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Feedback' },
        ]}
        sx={{ mb: { xs: 3, md: 3 } }}
      />
      <Grid container spacing={3}>
        <Grid xs={12}>
          <AppWelcome
            title="Welcome back 👋 User"
            description="We specialize in immigration and relocation services, which are handled in-house. All other legal matters are referred to our partner lawyers, who will contact you directly. A €100 handling fee applies upon submission of this form."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
        <Grid xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Complaint
              </Typography>
              <Typography variant="body2" paragraph>
                At Sweden Relocators AB, we are committed to delivering exceptional relocation and immigration services. Your satisfaction is our priority, and we take your feedback seriously. If you encounter any issues or have concerns regarding our services, we encourage you to reach out to us for prompt resolution.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                How to Submit a Complaint
              </Typography>
              <Typography variant="body2" paragraph>
                We have made it simple and convenient for you to share your feedback or file a complaint:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body2">
                    <strong>Online Form:</strong> Complete our Complaint Form available on our website and portal. Provide detailed information about your concern to help us address it effectively.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Email:</strong> Send us an email at complaint@swedenrelocators.se with your contact details and a description of the issue. In this case, the response time could be longer; we recommend submitting via the online Complaint form.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Complaint Number:</strong> After submitting the form, you will get your complaint ID.
                  </Typography>
                </li>
              </ol>
              <Typography variant="subtitle1" gutterBottom>
                Our Resolution Process
              </Typography>
              <ol>
                <li>
                  <Typography variant="body2">
                    <strong>Acknowledgment:</strong> We will acknowledge your complaint within 48 hours of receipt.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Investigation:</strong> Our team will thoroughly review the issue and may contact you for additional information if needed.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Resolution:</strong> We aim to resolve complaints within 10 business days. If more time is required, we will keep you informed of the progress.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Feedback:</strong> Once resolved, we will provide a detailed response outlining the actions taken and, if applicable, any steps to prevent similar issues in the future.
                  </Typography>
                </li>
              </ol>
              <Typography variant="subtitle1" gutterBottom>
                Escalation Procedure
              </Typography>
              <Typography variant="body2" paragraph>
                If you are unsatisfied with the resolution, you can escalate your concern by contacting our senior management team at info@swedenrelocators.se. We are dedicated to ensuring that every client receives fair and comprehensive support.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Commitment to Improvement
              </Typography>
              <Typography variant="body2" paragraph>
                Your feedback helps us improve our services. We continuously evaluate and enhance our processes to serve you better.
              </Typography>
              <Typography variant="body2" paragraph>
                Thank you for choosing Sweden Relocators AB. We are here to support you every step of the way.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Box sx={{ mt: 3 }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained"  onClick={handleComplaintClick}>
                Submit a Complaint
              </Button>
              <Button variant="outlined" onClick={handleExperienceClick}>
                Share Your Experience
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

