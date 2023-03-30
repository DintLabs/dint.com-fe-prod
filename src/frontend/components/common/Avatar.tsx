import React from 'react';
import { useNavigate } from 'react-router';
import { IUserOwnStories } from 'frontend/types/lounge';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { Avatar, Box, Modal, useMediaQuery } from '@mui/material';
import UserStories from '../UserStories/UserStories';

const DEFAULT_AVATAR_SIZE_MOBILE = 92;
const DEFAULT_AVATAR_SIZE_DESKTOP = 175;

type AvatarProps = {
  user: UserDataInterface;
  stories: IUserOwnStories[];
  size?: number;
  hideStories?: boolean;
  redirectOnCLick?: boolean;
};

function AvatarComponent({
  user,
  stories,
  size,
  hideStories,
  redirectOnCLick,
}: AvatarProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [storiesOpened, setStoriesOpened] = React.useState<boolean>(false);

  const avatarSize = React.useMemo(() => {
    if (size) {
      return size;
    }

    return isMobile
      ? DEFAULT_AVATAR_SIZE_MOBILE
      : DEFAULT_AVATAR_SIZE_DESKTOP;
    }, [isMobile, size]);

  const handleClick = React.useCallback(() => {
    if (stories.length > 0 && !hideStories) {
      setStoriesOpened(true);
    } else {
      if (redirectOnCLick) {
        navigate(`/${user.custom_username}`);
      }
    }
  }, [hideStories, navigate, redirectOnCLick, stories.length, user.custom_username]);

  return (
    <Box onClick={handleClick}>
      <Avatar
        className="story-avatar"
        src={user.profile_image}
        sx={{
          width: avatarSize,
          height: avatarSize,
          borderWidth: stories.length > 0 && !hideStories ? '3px' : 0,
          borderStyle: 'solid',
          borderColor: '#4AA081',
          cursor: 'pointer',
        }}
      />

      <Modal
        open={storiesOpened}
        onClose={() => setStoriesOpened(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UserStories
          stories={stories}
          username={user.custom_username}
          profileName={user.display_name ?? user.custom_username}
          avatarUrl={user.profile_image}
          onAllStoriesEnd={() => setStoriesOpened(false)}
          onClose={(event) => {
            event.stopPropagation();
            setStoriesOpened(false);
          }}
        />
      </Modal>
    </Box>
  );
}

export default AvatarComponent;
