import { m } from 'framer-motion';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { fToNow } from 'src/utils/format-time';
import { varHover } from 'src/components/animate';
import { Scrollbar } from 'src/components/scrollbar';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export function ContactsPopover({ data = [], sx, ...other }) {
  const popover = usePopover();

  const handleAddReferral = () => {
    console.log('Add Referral Clicked');
    // Implement your add referral logic here
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && { bgcolor: (theme) => theme.vars.palette.action.selected }),
          ...sx,
        }}
        {...other}
      >
        <SvgIcon>
          <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4" />
          <ellipse cx="16" cy="17" fill="currentColor" opacity="0.4" rx="5" ry="3" />
          <circle cx="9.001" cy="6" r="4" fill="currentColor" />
          <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" />
        </SvgIcon>
      </IconButton>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{
          arrow: { offset: 20 },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1.5 }}>
          <Typography variant="h6">
            Referrals <span>({data.length})</span>
          </Typography>
          <Button variant="contained" size="small" onClick={handleAddReferral}>
            Add Referral
          </Button>
        </Stack>

        <Scrollbar sx={{ height: 320, width: 320 }}>
          {data.map((contact) => (
            <MenuItem key={contact.id} sx={{ p: 1 }}>
              <Badge
                variant={contact.status}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ mr: 2 }}
              >
                <Avatar alt={contact.name} src={contact.avatarUrl} />
              </Badge>

              <ListItemText
                primary={contact.name}
                secondary={contact.status === 'offline' ? fToNow(contact.lastActivity) : ''}
                primaryTypographyProps={{ typography: 'subtitle2' }}
                secondaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </CustomPopover>
    </>
  );
}
