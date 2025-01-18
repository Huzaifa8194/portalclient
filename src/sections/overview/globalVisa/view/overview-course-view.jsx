import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function OverviewCourseView() {
  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={{
        borderTop: (theme) => ({
          lg: `solid 1px ${theme.vars.palette.grey['500Channel']}1F`, // Match `varAlpha` styling
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Center content vertically
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'text.secondary',
          }}
        >
          This Page is under construction.
        </Typography>
      </Box>
    </DashboardContent>
  );
}
