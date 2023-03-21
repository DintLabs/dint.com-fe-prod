import { Avatar, Badge, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'frontend/redux/store';
import React from 'react';
import StoriesUserOwn from '../../components/lounge/StoriesUserOwn';

const AVATAR_SIZE_MOBILE = 92;
const AVATAR_SIZE_DESKTOP = 175;

type ProfileAvatarProps = {
  isEligibleForFetchingPost: boolean;
  userProfileImage?: string;
  avatar?: string;
};

function ProfileAvatar({
  isEligibleForFetchingPost,
  userProfileImage,
  avatar = '',
}: ProfileAvatarProps) {
  const { userOwnStories } = useSelector((state: RootState) => state.lounge);
  const isMobile = useMediaQuery('(max-width:600px)');
  const avatarUrl = React.useMemo(
    () => userProfileImage ?? avatar,
    [userProfileImage, avatar],
  );
  const avatarSize = React.useMemo(
    () => isMobile
      ? AVATAR_SIZE_MOBILE
      : AVATAR_SIZE_DESKTOP,
    [isMobile],
  );

  if (!isEligibleForFetchingPost) {
    return (
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
        badgeContent=" "
        invisible={!avatarUrl}
      >
        <Avatar
          src={avatarUrl}
          sx={{ width: avatarSize, height: avatarSize }}
        />
      </Badge>
    );
  }

  return (
    <Badge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      overlap="circular"
      badgeContent=" "
    >
      {userOwnStories && userOwnStories.length > 0 ? (
        <StoriesUserOwn
          avatar={avatar}
          avatarSize={avatarSize}
          hideName
        />
      ) : (
        <Avatar
          src={avatarUrl}
          sx={{ width: avatarSize, height: avatarSize }}
        />
      )}
    </Badge>
  );
}

export default ProfileAvatar;
