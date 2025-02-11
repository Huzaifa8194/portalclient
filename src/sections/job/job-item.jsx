import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { _mock } from 'src/_mock';
import CoApplicantProfile from './co-applicant-profile';

export function JobItem({ job, onView, onEdit, onDelete }) {
  const popover = usePopover();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNameClick = (e) => {
    e.stopPropagation();
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  // Pass all data directly to CoApplicantProfile
  const applicantData = {
    name: job?.company?.name || 'N/A',
    nic: job?.nic || '123',
    dob: job?.dob || 'Feb,2004',
    passport: job?.passport || 'SE-79823',
    picture: job?.company?.logo || '',
    relation: job?.relation || 'Brother',
  };


  return (
    <>
      <Card 
        sx={{ 
          textAlign: 'center',
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.2s ease-in-out',
          },
        }} 
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
                bgcolor: (theme) => varAlpha(theme.palette.common.blackChannel, 0.48),
              },
            }}
          />
        </Box>

        <ListItemText
          sx={{ mt: 7, mb: 1 }}
          primary={
            <Typography
              component="a"
              variant="subtitle1"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={handleNameClick}
            >
              {job.company.name || 'Name'}
            </Typography>
          }
          secondary={job.relation || 'Brother'}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          sx={{ py: 3, typography: 'subtitle1' }}
        >
          {/* <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              NIC
            </Typography>
            {job.nic || '123'}
          </div> */}

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
      </Card>

      <CoApplicantProfile
        applicantData={applicantData}
        open={isProfileOpen}
        onClose={handleCloseProfile}
      />
    </>
  );
}

