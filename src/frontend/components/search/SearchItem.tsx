import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import '../../layouts/SearchDrawer.css'

interface SearchItemProps {
  data: any;
  removeItem(id: any): any 
}

const SearchItem = ({ data, removeItem }: SearchItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const goToProfile = () => {
    navigate(`/${data.custom_username}`);
  };

  return (
    <Box
      sx={{ cursor: 'pointer', position: 'relative' }}
      bgcolor={toggle ? theme.palette.grey[700] : '#FFFFFF'}
      borderRadius={1}
    >
      <Box p={1} gap={2} display="flex" onClick={goToProfile}>
        <Avatar src={data?.profile_image} sx={{ width: 40, height: 40 }} />
        <Stack>
          <Typography variant="h3" sx={{ color: toggle ? '#fff' : '#000000'}}>
            {data?.display_name}
          </Typography>
          <Typography variant="h6" sx={{ color: toggle ? '#fff' : '#0000008D' }}>
            {data?.custom_username}
          </Typography>
        </Stack>
      </Box>
      <span className='closeIcon' onClick={() => removeItem(data?.id)}><CloseIcon/></span>
    </Box>
  );
};

export default SearchItem;
