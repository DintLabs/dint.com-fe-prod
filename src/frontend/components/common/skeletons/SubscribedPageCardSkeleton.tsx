import { Grid, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useContext } from 'react';
import coverPhoto from '../../../material/images/create-page-cover-photo.png';
import { ThemeContext } from '../../../contexts/ThemeContext';

type SubscribedPageCardSkeletonProps = {
  numberOfCards: number;
};
const SubscribedPageCardSkeleton = ({ numberOfCards }: SubscribedPageCardSkeletonProps) => {
  const { toggle } = useContext(ThemeContext);
  return (
    <Grid container className="subscription-details-container">
      {Array.from({ length: numberOfCards }, (e, i) => (
        <Grid key={i} item sm={12} md={6} lg={4} className="page-detail-grid">
          <Box className="page-detail-card">
            <Box
              className="page-cover-picture-container full-image-container"
              sx={{ backgroundImage: `url(${coverPhoto})` }}
            />
            <Stack direction="column" className="page-detail-body" spacing={1}>
              <Stack direction="row" spacing={1}>
                <Skeleton variant="circular" className="page-profile-container" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
                <Stack direction="column" width="100%">
                  <Skeleton variant="text" sx={{ width: '50%', fontSize: '0.7rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
                  <Skeleton variant="text" sx={{ width: '20%', fontSize: '0.7rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
                </Stack>
              </Stack>
              <Stack direction="column">
                <Skeleton variant="text" sx={{ width: '100%', fontSize: '1rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              </Stack>
              <Stack direction="column">
                <Skeleton variant="text" sx={{ width: '100%', fontSize: '1rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              </Stack>
              <Stack direction="column">
                <Skeleton variant="text" sx={{ width: '100%', fontSize: '1rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscribedPageCardSkeleton;
