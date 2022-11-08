/* eslint-disable jsx-a11y/media-has-caption */

import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useRef, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const VideoCard = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     console.log(videoRef.current?.parentElement, videoRef.current);
  //     const options = {
  //       root: videoRef.current?.parentElement,
  //       rootMargin: '0px',
  //       threshold: 1
  //     };

  //     const handlePlay = (entries, observer) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           videoRef.current.play();
  //         } else {
  //           videoRef.current.pause();
  //         }
  //       });
  //     };

  //     const observer = new IntersectionObserver(handlePlay, options);

  //     observer.observe(videoRef.current);
  //   }
  // }, [videoRef.current?.parentElement?.scrollHeight]);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      if (videoRef.current !== null) videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      if (videoRef.current !== null) videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };
  return (
    <Box className="video-card">
      {/* video header */}
      <Stack direction="row" className="video-card-header " p={1} alignItems="center">
        <IconButton size="small">
          <ArrowBackIosIcon className="primary-text-color" fontSize="small" />
        </IconButton>
        <Typography className="primary-text-color">Videos</Typography>
      </Stack>

      <video
        ref={videoRef}
        onClick={onVideoPress}
        className="video-card-player"
        src="https://dint-dev.s3.us-east-1.amazonaws.com/main-photo/464680_video2.mp4"
        loop
      />

      {/* video footer */}
      <Stack direction="row" spacing={2} className="video-card-footer" mb={1} p={1}>
        <Avatar />
        <Stack direction="column">
          <Typography className="primary-text-color" variant="h3">
            Title
          </Typography>
          <Typography className="primary-text-color" variant="body2">
            subtitle
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VideoCard;
