import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function JobItem({ job, onView, onEdit, onDelete }) {
  const popover = usePopover();

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={job.company.name}
            src={job.company.logo}
            variant="rounded"
            sx={{ width: 70, height: 70, mb: 2 }}
          />

          <ListItemText
            sx={{ mb: 0 }}
            primary={
              <Link
                component={RouterLink}
                href={paths.dashboard.job.details(job.id)}
                color="inherit"
              >
                Name here
              </Link>
            }
            secondary={<></>}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ pt: 1.5 }}>
            {[

              {
                label: "Birth Place:",
                icon: "",
              },
              {
                label: "Nationality:",
                icon: "",
              },
            ].map((item) => (
              <Stack
                key={item.label}
                spacing={0.5}
                flexShrink={0}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.disabled', minWidth: 0 }}
              >
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>



          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ py: 2 }}>
            {[
              {
                label: "DOB:",
                icon: "",
              },
              {
                label: "Personnummer/CPR/NIC:",
                icon: "",
              },

            ].map((item) => (
              <Stack
                key={item.label}
                spacing={0.5}
                flexShrink={0}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.disabled', minWidth: 0 }}
              >
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>






          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 2 }}>
            {[
              {
                label: "Passport No:",
                icon: "",
              },
              {
                label: "",
                icon: "",
              },
              {
                label: "Expiry Date: -0001-11-30",
                icon: "",
              },
              {
                label: "Issue Date: -0001-11-30",
                icon: "",
              },
            ].map((item) => (
              <Stack
                key={item.label}
                spacing={0.5}
                flexShrink={0}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.disabled', minWidth: 0 }}
              >
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>









          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ py: 2 }}>
            {[
              {
                label: "Case No: Not Available",
                icon: "",
              },
              {
                label: "Case Registration Date: Not Available",
                icon: "",
              },

            ].map((item) => (
              <Stack
                key={item.label}
                spacing={0.5}
                flexShrink={0}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.disabled', minWidth: 0 }}
              >
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>



          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ pt: 2 }}>
            {[
              {
                label: "Address:",
                icon: "",
              },
              {
                label: "Sec Address: Not Available",
                icon: "",
              },

            ].map((item) => (
              <Stack
                key={item.label}
                spacing={0.5}
                flexShrink={0}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.disabled', minWidth: 0 }}
              >
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>




          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ pt: 1.5 }}>
            {[

              {
                label: "Email:",
                icon: "",
              },
              {
                label: "Phone No:",
                icon: "",
              },
            ].map((item) => (
              <Stack
                key={item.label}
                spacing={0.5}
                flexShrink={0}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.disabled', minWidth: 0 }}
              >
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>


        </Stack>


      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              onView();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              onEdit();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              onDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
