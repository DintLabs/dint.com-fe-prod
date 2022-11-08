import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface SearchItemProps {
  data: any;
}

const SearchItem = ({ data }: SearchItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const goToProfile = () => {
    navigate(`/${data.custom_username}`);
  };

  return (
    <Box
      sx={{ cursor: 'pointer', border : toggle ? '' : '1px solid #000000' }}
      onClick={goToProfile}
      display="flex"
      p={1}
      gap={2}
      bgcolor={toggle ? theme.palette.grey[700] : '#FFFFFF'}
      borderRadius={1}
    >
      <Avatar src={data?.profile_image} sx={{ width: 40, height: 40 }} />
      <Stack>
        <Typography variant="h3" sx={{ color: toggle ? 'text.primary' : '#000000'}}>
          {data?.display_name}
        </Typography>
        <Typography variant="h6" sx={{ color: toggle ? 'text.primary' : '0000008D' }}>
          {data?.custom_username}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SearchItem;
