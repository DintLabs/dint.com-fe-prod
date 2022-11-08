import { Box, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton, Typography } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import Loader from '../common/Loader';

type CoverProfileDropzoneProps = {
  title: string;
  setUploadedImage: Function;
  loading: boolean;
  previewUrl: string | null;
  setUploadedImageUrl: Function;
};

const CoverProfileDropzone = (props: CoverProfileDropzoneProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const theme = useTheme();
  const dropzone = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [] }
  });

  useEffect(() => {
    const uploadedFile = dropzone.acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setUploadedFiles(uploadedFile);
    props.setUploadedImage(uploadedFile);
  }, [dropzone.acceptedFiles]);

  const handleDeleteImage = () => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(dropzone.acceptedFiles[0]), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
    props.setUploadedImage([...dropzone.acceptedFiles]);
    props.setUploadedImageUrl(null);
  };

  return (
    // <section className="container">
    <Box className="cover-profile-dropzone-container">
      {/* Dropzone container */}
      {uploadedFiles.length === 0 && !props.previewUrl && (
        <Box {...dropzone.getRootProps({ className: 'dropzone' })} className="image-dropzone">
          <input {...dropzone.getInputProps()} />
          <AddPhotoAlternateIcon
            sx={{
              fontSize: 40,
              marginBottom: 2,
              color: theme.palette.primary.main
            }}
          />
          <Typography variant="h4">{props.title}</Typography>
          <Typography variant="caption">Drag n drop image here, or click to select.</Typography>
        </Box>
      )}
      {/* Image preview container */}
      {(uploadedFiles.length > 0 || props.previewUrl) && (
        <Box className="image-preview-container">
          <Loader loading={props.loading} />
          <img
            width="100%"
            height="100%"
            src={uploadedFiles[0]?.preview || props.previewUrl}
            alt="preview of card"
          />
          <IconButton
            className="image-delete-icon"
            size="small"
            title="Delete"
            onClick={handleDeleteImage}
          >
            <MdDelete />
          </IconButton>
        </Box>
      )}
    </Box>
    // </section>
  );
};

export default CoverProfileDropzone;
