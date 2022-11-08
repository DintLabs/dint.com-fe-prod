import { Grid, Skeleton } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import React, { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';

const PageSkeleton = () => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);

  return (
    <Box>
      <Grid container>
        <Grid item xs={0} md={3} sx={{ display: window.innerWidth >= 900 ? '' : 'none' }}>
          <Stack direction="column" spacing={2} mt={2}>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={30} height={30} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              <Skeleton variant="text" width="70%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={30} height={30} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              <Skeleton variant="text" width="60%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={30} height={30} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              <Skeleton variant="text" width="70%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={30} height={30} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              <Skeleton variant="text" width="60%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={30} height={30} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              <Skeleton variant="text" width="70%" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
            </Stack>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderLeft: `1px solid ${toggle ? theme.palette.grey[700] : '#adb7c542'}`,
            borderRight: `1px solid ${toggle ? theme.palette.grey[700] : '#adb7c542'}`,
            height: '100vh'
          }}
        >
          <Stack direction="column">
            <Box>
              <Skeleton variant="rectangular" height="320px" style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
            </Box>
            <Stack direction="row" spacing={2} p={2}>
              <Stack mt="-35px">
                <Skeleton variant="circular" width={96} height={96} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Skeleton variant="text" width={180} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
                <Skeleton variant="text" width={90} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageSkeleton;
