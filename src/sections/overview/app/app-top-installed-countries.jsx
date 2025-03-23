import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import { fShortenNumber } from 'src/utils/format-number';

import { Scrollbar } from 'src/components/scrollbar';
import { Iconify, FlagIcon } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AppTopInstalledCountries({ title, subheader, list, sx = {}, ...other }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ height: '100%', ...sx }} {...other}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Scrollbar sx={{ flex: 1 }}>
          <Box
            sx={{
              p: 3,
              gap: 3,
              minWidth: 360,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {list.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Box>
        </Scrollbar>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Item({ item, sx, ...other }) {
  const largeItem = (
    <Box
      sx={{
        gap: 1,
        minWidth: 120,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FlagIcon code={item.countryCode} />
      <Typography component="span" variant="subtitle2" noWrap>
        {item.countryName}
      </Typography>
    </Box>
  );

  const smallItem = (icon, system) => (
    <Box
      sx={{
        gap: 0.5,
        minWidth: 80,
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
      }}
    >
      <Iconify icon={icon} width={14} sx={{ color: 'text.secondary' }} />
      {fShortenNumber(system)}
    </Box>
  );

  return (
    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center', ...sx }} {...other}>
      {largeItem}
      {smallItem('ant-design:android-filled', item.android)}
      {smallItem('mingcute:windows-fill', item.windows)}
      {smallItem('mingcute:apple-fill', item.apple)}
    </Box>
  );
}