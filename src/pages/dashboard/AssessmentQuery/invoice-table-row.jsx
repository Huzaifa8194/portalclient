import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const confirm = useBoolean();
  const popover = usePopover();


  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ 'aria-label': 'Select invoice' }}
          />
        </TableCell>

        <TableCell>
          <Link
            component="button"
            color="inherit"
            onClick={onViewRow}
            sx={{ 
              typography: 'body2',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'primary.main'
            }}
          >
            {row.invoiceNumber}
          </Link>
        </TableCell>

        <TableCell>
          <ListItemText
            primary="Type"
            primaryTypographyProps={{ 
              typography: 'body2',
              noWrap: true,
              color: 'text.primary'
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText 
            primary="Result"
            primaryTypographyProps={{ 
              typography: 'body2',
              color: 'text.primary'
            }}
          />
        </TableCell>

        <TableCell>
        <ListItemText 
            primary={`Create Date: ${fDate(row.createDate)}`}
            primaryTypographyProps={{ 
              typography: 'body2',
              color: 'text.primary'
            }}
          />
        </TableCell>

        
       

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton 
            color={popover.open ? 'inherit' : 'default'} 
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{
          arrow: { placement: 'right-top' }
        }}
      >
        <MenuList>
          <MenuItem onClick={() => {
            onViewRow();
            popover.onClose();
          }}>
            <Iconify icon="solar:eye-bold" sx={{ mr: 2 }} />
            View
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

