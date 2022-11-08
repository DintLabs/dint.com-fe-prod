import { ListItemAvatar, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

const UserListItemSkeleton = () => {
  const { toggle } = useContext(ThemeContext);
  
  return (
    <Stack
      className="user-list-item"
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ px: { xs: 0.5, md: 1, xl: 2 }, py: 1 }}
      component="div"
    >
      <Skeleton variant="circular" width={40} height={40} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
      <ListItemAvatar>
        <Stack direction="column">
          <Skeleton variant="text" width="250%" sx={{ fontSize: '0.7rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
          <Skeleton variant="text" width="180%" sx={{ fontSize: '0.5rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
        </Stack>
      </ListItemAvatar>
    </Stack>
  );
};

export default UserListItemSkeleton;
