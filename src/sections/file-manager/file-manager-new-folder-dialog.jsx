// import { useState, useEffect, useCallback } from 'react';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// import { Upload } from 'src/components/upload';
// import { Iconify } from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export function FileManagerNewFolderDialog({
//   open,
//   onClose,
//   onCreate,
//   onUpdate,
//   folderName,
//   onChangeFolderName,
//   title = 'Upload files',
//   ...other
// }) {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     if (!open) {
//       setFiles([]);
//     }
//   }, [open]);

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       setFiles([...files, ...acceptedFiles]);
//     },
//     [files]
//   );

//   const handleUpload = () => {
//     onClose();
//     console.info('ON UPLOAD');
//   };

//   const handleRemoveFile = (inputFile) => {
//     const filtered = files.filter((file) => file !== inputFile);
//     setFiles(filtered);
//   };

//   const handleRemoveAllFiles = () => {
//     setFiles([]);
//   };

//   return (
//     <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
//       <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

//       <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
//         {(onCreate || onUpdate) && (
//           <TextField
//             fullWidth
//             label="Folder name"
//             value={folderName}
//             onChange={onChangeFolderName}
//             sx={{ mb: 3 }}
//           />
//         )}

//         <Upload multiple value={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
//       </DialogContent>

//       <DialogActions>
//         <Button
//           variant="contained"
//           startIcon={<Iconify icon="eva:cloud-upload-fill" />}
//           onClick={handleUpload}
//         >
//           Upload
//         </Button>

//         {!!files.length && (
//           <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
//             Remove all
//           </Button>
//         )}

//         {(onCreate || onUpdate) && (
//           <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
//             <Button variant="soft" onClick={onCreate || onUpdate}>
//               {onUpdate ? 'Save' : 'Create'}
//             </Button>
//           </Stack>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }

import React, { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function FileManagerNewFolderDialog({ open, onClose, onCreateFolder }) {
  const [folderName, setFolderName] = useState('');

  const handleCreate = useCallback(() => {
    if (folderName.trim()) {
      onCreateFolder(folderName);
      setFolderName('');
      onClose();
    }
  }, [folderName, onCreateFolder, onClose]);

  const handleChange = (event) => {
    setFolderName(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Folder Name"
          type="text"
          fullWidth
          variant="outlined"
          value={folderName}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

