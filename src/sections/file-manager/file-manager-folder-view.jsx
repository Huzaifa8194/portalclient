import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fData } from 'src/utils/format-number';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { FileManagerFileDetails } from './file-manager-file-details';

export function FileManagerFolderView({ folder, onFileClick, onFolderUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [folderContent, setFolderContent] = useState(folder);
  const fileInputRef = useRef(null);

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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const updatedFolder = {
      ...folderContent,
      images: [...folderContent.images, ...newFiles],
    };
    setFolderContent(updatedFolder);
    onFolderUpdate(updatedFolder);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {folderContent.name}
        </Typography>
        <Box
          component="label"
          htmlFor="upload-file"
          sx={{
            p: 1,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Upload
          <input
            id="upload-file"
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            multiple
          />
        </Box>
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
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

