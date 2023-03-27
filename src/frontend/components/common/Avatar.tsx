import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { IUserOwnStories } from 'frontend/types/lounge';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { Avatar, Box, Modal, useMediaQuery } from '@mui/material';
import Stories from 'react-insta-stories';
import CloseIcon from '@mui/icons-material/Close';
import { Story } from 'react-insta-stories/dist/interfaces';
import { createUserStories } from '../../utils/stories';

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

  const formattedStories: Story[] = React.useMemo(() => createUserStories({
    user_stories: stories,
  }), [stories]);

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
        <Box
          sx={{
            position: 'relative',
            '@media screen and (max-width: 899px)': {
              height: '100%', width: '100%', display: 'flex', alignItems: 'center',flex: 1,flexDirection: 'column',
              '> div': {
                '> div ~ div': {
                  flex:1,
                  'div': {
                    width: '100%',
                  },
                },
              },
            }
          }}
        >
          <div
            onClick={() => navigate(`/${user?.custom_username}`)}
            style={{
              display:'flex',
              gap: '15px',
              position: 'absolute',
              top: 20,
              left: 15,
              zIndex: 1000,
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <Avatar
              className="story-avatar"
              src={user?.profile_image}
              sx={{
                width: 50,
                height: 50,
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: "#4AA081",
                position: "relative",
              }}
            />
            <h4 style={{color: '#fff'}}>{user?.display_name}</h4>
          </div>
          <Stories
            keyboardNavigation
            stories={formattedStories}
            onStoryEnd={(s: any, st: any) => console.log("story ended", s, st)}
            onAllStoriesEnd={(s: any, st: any) => setStoriesOpened(false)}
            onStoryStart={(s: any, st: any) => console.log("story started", s, st)}
            width={window.innerWidth < 900 ? "100%" : undefined}
            height={window.innerWidth < 900 ? "100%" : undefined}
          />
          <CloseIcon
            onClick={(e: any) => {
              e.stopPropagation();
              setStoriesOpened(false);
            }}
            style={{
              cursor: 'pointer',
              color: 'white',
              zIndex: 9999,
              position: 'absolute',
              top: '25px',
              right: '15px'
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default AvatarComponent;
