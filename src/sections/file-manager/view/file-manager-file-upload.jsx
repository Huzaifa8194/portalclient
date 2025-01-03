import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Field } from 'src/components/hook-form';

export function FileManagerFileUpload({ open, onClose, onUpload, currentFolder }) {
  const [files, setFiles] = useState([]);

  const handleUpload = () => {
    if (files.length > 0) {
      onUpload(files);
      onClose();
      setFiles([]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        {currentFolder ? (
          <>
            <p>Uploading to folder: {currentFolder.name}</p>
            <Field.Upload
              multiple
              thumbnail
              name="files"
              maxSize={3145728}
              onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
              onRemove={(file) => setFiles(files.filter((f) => f !== file))}
              onRemoveAll={() => setFiles([])}
            />
          </>
        ) : (
          <p>Please select a folder before uploading files.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpload} variant="contained" disabled={!currentFolder || files.length === 0}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

