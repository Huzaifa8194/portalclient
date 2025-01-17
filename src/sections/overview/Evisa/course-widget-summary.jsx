import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SvgColor } from 'src/components/svg-color';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: 'currentColor',
    opacity: 0.1,
  }
}));

const StyledIcon = styled(SvgColor, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color = 'primary' }) => ({
  width: 48,
  height: 48,
  position: 'absolute',
  right: 24,
  top: 24,
  padding: 8,
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`,
  '& svg': {
    display: 'block',
    width: '100%',
    height: '100%',
    color: theme.palette.common.white,
  }
}));

export function CourseWidgetSummary({ 
  sx, 
  icon, 
  title, 
  total, 
  color = 'primary', 
  ...other 
}) {
  return (
    <StyledCard sx={{ p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1, pr: 7 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: `${color}.main`, fontWeight: 'bold' }}>
          {total}
        </Typography>
      </Box>

      {icon && (
        <StyledIcon
          src={icon}
          color={color}
        />
      )}
    </StyledCard>
  );
}