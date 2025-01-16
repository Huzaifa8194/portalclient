import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { SvgColor } from 'src/components/svg-color';
import { fNumber } from 'src/utils/format-number';
import { varAlpha } from 'src/theme/styles';

export function AppWidgetHeading({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();

  return (
    <Button
      component={Card}
      fullWidth
      sx={{
        py: 3,
        pl: 3,
        pr: 2.5,
        height: '100%',
        textAlign: 'left',
        color: 'inherit',
        bgcolor: 'background.paper',
        '&:hover': {
          bgcolor: 'background.neutral',
        },
        m: 2,
        border: `1px solid ${theme.palette.divider}`, // Added border
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: 'h3', color: 'text.primary' }}>{fNumber(total)}</Box>
        <Typography
          noWrap
          variant="subtitle2"
          component="div"
          sx={{ color: 'text.primary', fontWeight: 600 }}
        >
          {title}
        </Typography>
      </Box>

      <SvgColor
        src={icon}
        sx={{
          top: 24,
          right: 20,
          width: 36,
          height: 36,
          position: 'absolute',
          background: (t) =>
            `linear-gradient(135deg, ${t.vars.palette[color].main} 0%, ${t.vars.palette[color].dark} 100%)`,
        }}
      />

      <Box
        sx={{
          top: -44,
          width: 160,
          zIndex: -1,
          height: 160,
          right: -104,
          opacity: 0.12,
          borderRadius: 3,
          position: 'absolute',
          transform: 'rotate(40deg)',
          background: (t) =>
            `linear-gradient(to right, ${
              t.vars.palette[color].main
            } 0%, ${varAlpha(t.vars.palette[color].mainChannel, 0)} 100%)`,
        }}
      />
    </Button>
  );
}
