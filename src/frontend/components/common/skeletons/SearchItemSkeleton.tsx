import { Box, Skeleton, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

const SearchItemSkeleton = () => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);
  return (
    <Box display="flex" p={1} gap={2} bgcolor={toggle ? theme.palette.grey[700] : '#adb7c542'} borderRadius={1}>
      <Skeleton variant="circular" width={35} height={35} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
      <Stack>
        <Skeleton variant="text" width="100%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
        <Skeleton variant="text" width="80%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
      </Stack>
    </Box>
  );
};

export default SearchItemSkeleton;
