import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'src/routes/hooks';
import { _mock } from 'src/_mock';

export function JobItem({ job, onView, onEdit, onDelete }) {
  const popover = usePopover();
  const router = useRouter();

  const handleCardClick = () => {
    router.push({
      pathname: '/profile',
      query: { 
        name: job.company.name,
        image: job.company.logo
      }
    });
  };

  return (
    <>
      <Card 
        sx={{ 
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.2s ease-in-out',
          },
        }} 
        onClick={handleCardClick}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton 
            onClick={(e) => {
              e.stopPropagation();
              popover.onOpen(e);
            }} 
            sx={{ 
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 12,
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

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
            alt={job.company.name}
            src={job.company.logo}
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
         
            src={_mock.image.cover(1)}
            alt={job.company.name}
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
          primary={job.company.name || 'Name'}
          secondary={job.relation || 'Brother'}
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{ py: 3, typography: 'subtitle1' }}
        >
          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              NIC
            </Typography>
            {job.nic || '123'}
          </div>

          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              DOB
            </Typography>
            {job.dob || 'Feb,2004'}
          </div>

          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              Passport
            </Typography>
            {job.passport || 'SE-79823'}
          </div>
        </Box>
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem 
            onClick={(e) => { 
              e.stopPropagation();
              popover.onClose(); 
              onView(); 
            }}
            sx={{ gap: 1 }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
          <MenuItem 
            onClick={(e) => { 
              e.stopPropagation();
              popover.onClose(); 
              onEdit(); 
            }}
            sx={{ gap: 1 }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem 
            onClick={(e) => { 
              e.stopPropagation();
              popover.onClose(); 
              onDelete(); 
            }}
            sx={{ color: 'error.main', gap: 1 }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}

