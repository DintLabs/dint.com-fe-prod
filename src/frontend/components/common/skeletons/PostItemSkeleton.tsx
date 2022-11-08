import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
  useTheme
} from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

const PostItemSkeleton = () => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);
  return (
    <Box
      style={{
        borderBottom: `1px solid ${toggle ? theme.palette.grey[700] : '#adb7c542'}`
      }}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="30%" sx={{ fontSize: '1rem' }} />}
          />
          <Skeleton variant="text" width="4%" sx={{ fontSize: '1rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
        </ListItem>
      </List>
      <Box sx={{ textAlign: 'center', padding: '0 10px 0 10px' }}>
        <Skeleton variant="rectangular" height={230} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
      </Box>
      <Box sx={{ p: 2 }} className="d-flex align-items-center justify-content-between">
        <Skeleton variant="text" width="6%" sx={{ fontSize: '1rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
        <Skeleton variant="text" width="4%" sx={{ fontSize: '1rem' }} style={{ backgroundColor: toggle ? '' : '#adb7c542' }} />
      </Box>
    </Box>
  );
};

export default PostItemSkeleton;
