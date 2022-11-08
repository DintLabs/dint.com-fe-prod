import { Avatar, Box, Button as MUIButton, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface FollowerRequestItemProps {
  data: any;
  onRemove: Function;
}

const FollowersItem = ({ data, onRemove }: FollowerRequestItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const goToProfile = () => {
    navigate(`/${data.custom_username}`);
  };

  return (
    <Box display="flex" p={2} gap={2} bgcolor={toggle ? theme.palette.grey[700] : theme.palette.grey[300]} borderRadius={2}>
      <Avatar
        onClick={goToProfile}
        src={data?.profile_image}
        sx={{ width: 75, height: 75, cursor: 'pointer' }}
      />
      <Stack>
        <Typography
          onClick={goToProfile}
          variant="h3"
          sx={{ color: toggle ? 'text.primary' : '#161C24', cursor: 'pointer' }}
        >
          {data?.display_name}
        </Typography>
        <Typography
          onClick={goToProfile}
          variant="h6"
          sx={{ color: 'text.secondary', cursor: 'pointer' }}
        >
          {data?.custom_username}
        </Typography>
        <Stack direction="row" gap={2} mt={1}>
          <MUIButton
            variant="contained"
            color="secondary"
            component="label"
            onClick={() => onRemove(data)}
          >
            Remove
          </MUIButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FollowersItem;
