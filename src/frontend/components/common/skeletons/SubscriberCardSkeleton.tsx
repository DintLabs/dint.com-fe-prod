import { Avatar, Divider, Grid, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

type SubscriberCardSkeletonProps = {
  numberOfCards: number;
};

const SubscriberCardSkeleton = ({ numberOfCards }: SubscriberCardSkeletonProps) => {
  const { toggle } = useContext(ThemeContext);

  return (
    <Grid container className="subscription-details-container">
      {Array.from({ length: numberOfCards }, (e, i) => (
        <Grid key={i} item sm={12} md={6} lg={4} className="user-details-grid">
          <Box className="user-detail-card">
            <Stack direction="row" spacing={1} className="user-profile-container">
              <Skeleton variant="circular" style={{ backgroundColor: toggle ? '' : '#adb7c542' }}>
                <Avatar />
              </Skeleton>

              <Stack direction="column" width="100%">
                <Skeleton
                  variant="text"
                  sx={{ paddingBottom: '0.3rem', width: '70%', fontSize: '0.7rem' }}
                  style={{ backgroundColor: toggle ? '' : '#adb7c542' }}
                />
                <Skeleton variant="text" sx={{ fontSize: '0.5rem', width: '50%' }}  style={{ backgroundColor: toggle ? '' : '#adb7c542' }}/>
              </Stack>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Skeleton
                  variant="text"
                  sx={{ paddingBottom: '0.3rem', width: '100%', fontSize: '0.7rem' }}
                  style={{ backgroundColor: toggle ? '' : '#adb7c542' }}
                />
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Skeleton
                  variant="text"
                  sx={{ paddingBottom: '0.3rem', width: '100%', fontSize: '0.7rem' }}
                  style={{ backgroundColor: toggle ? '' : '#adb7c542' }}
                />
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Skeleton
                  variant="text"
                  sx={{ paddingBottom: '0.3rem', width: '100%', fontSize: '0.7rem' }}
                  style={{ backgroundColor: toggle ? '' : '#adb7c542' }}
                />
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Skeleton
                  variant="text"
                  sx={{ paddingBottom: '0.3rem', width: '100%', fontSize: '0.7rem' }}
                  style={{ backgroundColor: toggle ? '' : '#adb7c542' }}
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriberCardSkeleton;
