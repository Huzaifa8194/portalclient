import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { fileFormat, FileThumbnail } from 'src/components/file-thumbnail';

export function FileManagerFileDetails({
  item,
  open,
  onClose,
  onDelete,
  favorited,
  onFavorite,
  onCopyLink,
  ...other
}) {
  const properties = useBoolean(true);

  if (!item) {
    return null;
  }

  const { name, size, url, type, modifiedAt, category, description } = item;

  const getThumbnailFile = (file) => {
    if (file.type === 'folder') {
      return 'folder';
    }
    if (file.preview) {
      return file.preview;
    }
    if (file.url) {
      return file.url;
    }
    return file.type;
  };

  const renderProperties = (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ typography: 'subtitle2' }}
      >
        Properties
        <IconButton size="small" onClick={properties.onToggle}>
          <Iconify
            icon={properties.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </IconButton>
      </Stack>

      {properties.value && (
        <>
          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Size
            </Box>
            {fData(size)}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Modified
            </Box>
            {fDateTime(modifiedAt)}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Type
            </Box>
            {fileFormat(type)}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Category
            </Box>
            {category}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Description
            </Box>
            {description}
          </Stack>
        </>
      )}
    </Stack>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 320 } }}
      {...other}
    >
      <Scrollbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6"> Info </Typography>

          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={onFavorite}
          />
        </Stack>

        <Stack
          spacing={2.5}
          justifyContent="center"
          sx={{ p: 2.5, bgcolor: 'background.neutral' }}
        >
          <FileThumbnail
            imageView
            file={getThumbnailFile(item)}
            sx={{ width: 'auto', height: 'auto', alignSelf: 'flex-start' }}
            slotProps={{
              img: {
                width: 320,
                height: 'auto',
                aspectRatio: '4/3',
                objectFit: 'cover',
              },
              icon: { width: 64, height: 64 },
            }}
          />

          <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
            {name}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {renderProperties}
        </Stack>
      </Scrollbar>

      <Box sx={{ p: 2.5 }}>
        <Button
          fullWidth
          variant="soft"
          color="error"
          size="large"
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Box>
    </Drawer>
  );
}

