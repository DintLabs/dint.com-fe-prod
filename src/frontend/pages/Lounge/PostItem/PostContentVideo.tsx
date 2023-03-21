import React from 'react';
import { Box } from '@mui/material';

type PostContentVideoProps = {
  src: string;
  onClick?: () => void;
};

function PostContentVideo({
  src,
  onClick = () => {},
}: PostContentVideoProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      {/* we don't have captions to show, so disable the rule below */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video width="100%" onClick={onClick} controls>
        <source src={src} id="video_here" />
        Your browser does not support HTML5 video.
      </video>
    </Box>
  );
}

export default PostContentVideo;
