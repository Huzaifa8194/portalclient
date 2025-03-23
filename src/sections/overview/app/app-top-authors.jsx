import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import { orderBy } from 'src/utils/helper';
import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';
import { Scrollbar } from 'src/components/scrollbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AppTopAuthors({ title, subheader, list, sx = {}, ...other }) {
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
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {orderBy(list, ['totalFavorites'], ['desc']).map((item, index) => (
              <Item key={item.id} item={item} index={index} />
            ))}
          </Box>
        </Scrollbar>
      </Box>
    </Card>
  );
}

function Item({ item, index, sx, ...other }) {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      <Avatar alt={item.name} src={item.avatarUrl} />

      <Box flexGrow={1}>
        <Box sx={{ typography: 'subtitle2' }}>{item.name}</Box>
      </Box>
    </Box>
  );
}