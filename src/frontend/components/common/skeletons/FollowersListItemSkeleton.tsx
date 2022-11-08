import { Box, Skeleton, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';

const FollowersListItemSkeleton = () => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);
  return (
    <Box display="flex" p={2} gap={2} bgcolor={toggle ? theme.palette.grey[700] : '#adb7c542'} borderRadius={2}>
      <Skeleton variant="circular" width={65} height={65} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
      <Stack>
        <Skeleton variant="text" width="50%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
        <Skeleton variant="text" width="25%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />

        <Stack direction="row" gap={2} mt={1}>
          <Skeleton variant="rectangular" width={40} height={20} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
          <Skeleton variant="rectangular" width={40} height={20}  style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default FollowersListItemSkeleton;
