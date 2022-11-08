import { Box } from '@mui/material';
import React from 'react';
import VideoCard from './VideoCard';

const VideoCardsMobileView = () => {
  return (
    <Box className="video-cards-container">
      {/* video card */}
      <VideoCard key={1} />
      <VideoCard key={2} />
      <VideoCard key={3} />
      <VideoCard key={4} />
    </Box>
  );
};

export default VideoCardsMobileView;
