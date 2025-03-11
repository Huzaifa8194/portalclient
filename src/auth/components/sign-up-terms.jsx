import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }) {
  return (
    <Box
      component="span"
      sx={{
        mt: 3,
        display: 'block',
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
        ...sx,
      }}
      {...other}
    >
    </Box>
  );
}
