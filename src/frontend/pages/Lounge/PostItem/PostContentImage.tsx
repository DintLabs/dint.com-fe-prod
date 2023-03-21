import React from 'react';
import { Box } from '@mui/material';

type PostContentImageProps = {
  src: string;
  alt?: string;
  onClick?: () => void;
};

function PostContentImage({
  src,
  alt,
  onClick = () => {},
}: PostContentImageProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <img
        src={src}
        alt={alt ?? 'post'}
        style={{ width: '100%' }}
        onClick={onClick}
      />
    </Box>
  );
}

export default PostContentImage;
