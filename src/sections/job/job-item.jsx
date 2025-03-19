import React, { useState, useEffect } from 'react';
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
import countries from './countries.json';

export function JobItem({ job, onEdit, onDelete }) {
  const popover = usePopover();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [flagUrl, setFlagUrl] = useState('');
  const [displayCountry, setDisplayCountry] = useState('');

  useEffect(() => {
    const processCountryData = () => {
      try {
        const rawCountry = (job.country || '').toLowerCase().trim();
        const countryData = countries[rawCountry] || {
          code: rawCountry.slice(0, 2),
          display: job.country || 'N/A'
        };

        setDisplayCountry(
          countryData.display.charAt(0).toUpperCase() + 
          countryData.display.slice(1).toLowerCase()
        );
        
        setFlagUrl(`https://flagcdn.com/${countryData.code}.svg`);
      } catch (error) {
        console.error('Error processing country data:', error);
        setFlagUrl(_mock.image.cover(1));
        setDisplayCountry(job.country || 'N/A');
      }
    };

    processCountryData();
  }, [job.country]);

  const handleNameClick = (e) => {
    e.stopPropagation();
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const femaleRelationships = ['Mother', 'Sister', 'Wife', 'Daughter'];
  const maleRelationships = ['Father', 'Brother', 'Husband', 'Son'];

  const avatarImage = femaleRelationships.includes(job?.relation)
    ? _mock.image.avatar(2)
    : maleRelationships.includes(job?.relation)
    ? _mock.image.avatar(24)
    : _mock.image.avatar(24);

  const applicantData = {
    name: job?.company?.name || 'N/A',
    nic: job?.nic || '123',
    dob: job?.dob || 'Feb,2004',
    passport: job?.passport || 'SE-79823',
    picture: job?.company?.logo || avatarImage,
    relation: job?.relation || 'Brother',
    email: job?.email || 'N/A',
    contactnumber: job?.contact_number || 'N/A',
    address: job?.address || 'N/A',
    city: job?.city || 'N/A',
    country: displayCountry,
    postalcode: job?.postalcode || 'N/A',
    id: job?.id || 'N/A',
    countryofissue: job?.countryofissue || 'N/A',
    expirydate: job?.expiry_date || 'N/A',
    issueplace: job?.issueplace || 'N/A',
    issuedate: job?.issue_date || 'N/A',
    place_of_birth: job?.place_of_birth || 'N/A',
    contact: job?.contact || 'N/A',
  };

  return (
    <>
      <Card
        sx={{
          textAlign: 'center',
          width: { xs: '100%', sm: '300px' },
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
            src={avatarImage}
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
  src={flagUrl}
  alt={`${displayCountry} flag`}
  ratio="16/9"
  sx={{
    border: (theme) => `2px solid ${theme.palette.divider}`,
    borderRadius: 1
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
          secondary={
            <>
              {job.relation || 'Brother'}
              <br />
              ID: {job.id || 'N/A'}
            </>
          }
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          sx={{ py: 3, typography: 'subtitle1', gap: 1 }}
        >
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

          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              Contact:
            </Typography>
            {job.contact || 'N/A'}
          </div>

          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              Country:
            </Typography>
            {displayCountry || 'N/A'}
          </div>

          {/* <Box
            gridColumn="1 / -1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: 'center' }}
          >
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              Email
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
              {job.email || 'N/A'}
            </Typography>
          </Box> */}
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
        applicantId={job.id}
      />
    </>
  );
}