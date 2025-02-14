import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function AppWidgetHeading({ title, sx, ...other }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        justifyContent: 'center',
        minHeight: 120,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ 
        typography: 'subtitle2', 
        fontWeight: 'bold',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'black',
        textAlign: 'center'
      }}>{title}</Box>
    </Card>
  );
}

