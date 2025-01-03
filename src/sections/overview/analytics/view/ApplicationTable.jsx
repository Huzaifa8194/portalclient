import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import { applications } from 'src/_mock/_applications';
import { Image } from 'src/components/image';
import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { OverviewAnalyticsView } from './overview-analytics-view';


export function ApplicationTable({ authority }) {
  const image="https://i0.wp.com/picjumbo.com/wp-content/uploads/red-and-blue-pillars-wallpaper-abstract-background-free-image.jpeg?w=600&quality=80";
  const [selectedApplication, setSelectedApplication] = useState(null);
  const filteredApplications = applications[authority] || [];

  const handleViewClick = (caseNo, govAuthority) => {
    setSelectedApplication({ caseNo, authority: govAuthority });
  };

  const handleBack = () => {
    setSelectedApplication(null);
  };

  if (selectedApplication) {
    return (
      <OverviewAnalyticsView
        caseNo={selectedApplication.caseNo}
        authority={selectedApplication.authority}
        onBack={handleBack}
      />
    );
  }

  return (
    <Box sx={{ padding: '20px 24px' }}>
        <CustomBreadcrumbs
                heading="Application Status"
                links={[
                  { name: 'Dashboard' },
                  { name: 'Application Status' },
                  { name: 'Application Detail  ' },
                ]}
                sx={{ mb: { xs: 3, md: 3 } }}
              />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Application Details for {authority}
      </Typography>
      <Grid container spacing={3}>
        {filteredApplications.map((app, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <AvatarShape
                  sx={{
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    mx: 'auto',
                    bottom: -26,
                    position: 'absolute',
                  }}
                />

                <Avatar
                  alt={app["Application Type"]}
                  src="/static/images/avatar_placeholder.png"
                  sx={{
                    width: 64,
                    height: 64,
                    zIndex: 11,
                    left: 0,
                    right: 0,
                    bottom: -32,
                    mx: 'auto',
                    position: 'absolute',
                  }}
                />

                <Image
                  src={image}
                  alt="Cover"
                  ratio="16/9"
                  slotProps={{
                    overlay: {
                      bgcolor: (theme) => varAlpha(theme.vars.palette.common.blackChannel, 0.48),
                    },
                  }}
                />
              </Box>

              <ListItemText
                sx={{ mt: 7, mb: 1 }}
                primary={app["Application Type"]}
                secondary={app["Gov Authority"]}
                primaryTypographyProps={{ typography: 'subtitle1' }}
                secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
              />

              <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Case No:</strong>{' '}
                  {app["Case No"] === 'Not Assigned' ? 'N/A' : app["Case No"]}
                </Typography>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                sx={{ py: 3, typography: 'subtitle1' }}
              >
                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Registration Date
                  </Typography>
                  {app["Registration Date"]}
                </div>

                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Status
                  </Typography>
                  Active
                </div>
              </Box>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box sx={{ py: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleViewClick(app["Case No"], app["Gov Authority"])}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

