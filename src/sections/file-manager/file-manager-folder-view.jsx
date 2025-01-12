import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import { fData } from 'src/utils/format-number';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { Iconify } from 'src/components/iconify';
import { FileManagerFileDetails } from './file-manager-file-details';

export function FileManagerFolderView({ folder, onFileClick, onFolderUpdate, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [folderContent, setFolderContent] = useState(folder);

  useEffect(() => {
    setFolderContent(folder);
  }, [folder]);

  if (!folderContent) {
    return null;
  }

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setOpenDetails(true);
    if (onFileClick) {
      onFileClick(file);
    }
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleDelete = () => {
    console.log('Delete file:', selectedFile);
    setOpenDetails(false);
  };

  const handleFavorite = () => {
    console.log('Toggle favorite:', selectedFile);
  };

  const handleCopyLink = () => {
    console.log('Copy link:', selectedFile);
  };

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

  return (
    <Box>
      <Box >
        <Button sx={{ mb: 3 }}
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={onBack}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {folderContent.name}
        </Typography>
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {folderContent.images.map((file, index) => (
          <Paper
            key={`${file.name}-${index}`}
            variant="outlined"
            sx={{
              p: 2.5,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => handleFileClick(file)}
          >
            <Box sx={{ mb: 2, width: 40, height: 40 }}>
              <FileThumbnail file={getThumbnailFile(file)} />
            </Box>

            <ListItemText
              primary={file.name}
              secondary={fData(file.size)}
              primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </Paper>
        ))}
      </Box>

      <FileManagerFileDetails
        item={selectedFile}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={handleDelete}
        favorited={selectedFile?.favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopyLink}
      />
    </Box>
  );
}

