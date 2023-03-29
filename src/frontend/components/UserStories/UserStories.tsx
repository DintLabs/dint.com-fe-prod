import React from 'react';
import Stories from 'react-insta-stories';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, IconButton } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { IUserOwnStories } from 'frontend/types/lounge';
import { createUserStories } from 'frontend/utils/stories';
import StoryFooter from './StoryFooter';

type UserStoriesProps = {
  username: string;
  profileName: string;
  avatarUrl: string;
  stories: IUserOwnStories[];
  onStoryStart?: (index: number) => void;
  onStoryEnd?: (index: number) => void;
  onAllStoriesEnd?: Function;
  onClose: React.MouseEventHandler<SVGSVGElement>;
  hideActions?: boolean;
};

function UserStories({
  username,
  profileName,
  avatarUrl,
  stories,
  onStoryStart,
  onStoryEnd,
  onAllStoriesEnd,
  onClose,
  hideActions,
}: UserStoriesProps) {
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);

  const formattedStories = React.useMemo(() => createUserStories({
    user_stories: stories,
  }), [stories]);

  const handleStoryStart = React.useCallback((index: number, st: any) => {
    console.log('story started:', index, st);
    setCurrentStoryIndex(index);
    if (onStoryStart) {
      onStoryStart(index);
    }
  }, [onStoryStart]);

  const handleStoryEnd = React.useCallback((index: number, st: any) => {
    console.log('story ended:', index, st);
    if (onStoryEnd) {
      onStoryEnd(index);
    }
  }, [onStoryEnd]);

  const handleAllStoriesEnd = React.useCallback((index: number, st: any) => {
    console.log('all stories ended', index, st);
    if (onAllStoriesEnd) {
      onAllStoriesEnd();
    }
  }, [onAllStoriesEnd]);

  return (
    <Box
      sx={{
        position: 'relative',
        '@media screen and (max-width: 899px)': {
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          flex: 1,
          '> div ~ div': {
            '> div ~ div': {
              height: '100vh !important',
              div: {
                width: '100%',
              },
            },
          },
        },
      }}
    >
      <div
        onClick={() => navigate(`/${username}`)}
        style={{
          display: 'flex',
          gap: '15px',
          position: 'absolute',
          top: 20,
          left: 15,
          zIndex: 1000,
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Avatar
          className="story-avatar"
          src={avatarUrl}
          sx={{
            width: 50,
            height: 50,
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: '#4AA081',
            position: 'relative',
          }}
        />
        <h4 style={{ color: "#fff" }}>{profileName}</h4>
        {/* {story.user_stories.map((user_story: any) => <h4>{moment(user_story.created_at).fromNow()}</h4> )} */}
      </div>
      <Stories
        stories={formattedStories}
        onStoryStart={handleStoryStart}
        onStoryEnd={handleStoryEnd}
        onAllStoriesEnd={handleAllStoriesEnd}
        width={window.innerWidth < 900 ? '100%' : undefined}
        height={window.innerWidth < 900 ? '100%' : undefined}
      />
      <CloseIcon
        onClick={onClose}
        style={{
          cursor: 'pointer',
          color: 'white',
          zIndex: 9999,
          position: 'absolute',
          top: '25px',
          right: '15px',
        }}
      />

      {!hideActions && (
        <StoryFooter
          username={username}
          story={stories[currentStoryIndex]}
        />
      )}
    </Box>
  );
}

export default UserStories;
