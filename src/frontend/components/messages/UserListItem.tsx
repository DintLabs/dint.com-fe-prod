import React from 'react';
import { useNavigate } from 'react-router';
import { Stack, Box } from '@mui/system';
import { Avatar, Badge, Typography } from '@mui/material';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

type UserListItemProps = {
  id: number;
  profile: string | any;
  name: string;
  caption: string;
  isSelected?: boolean;
  newMessage?: any;
  chatRoom?: any;
  onClickHandler?: () => void;
  unseenMessages?: any[];
};

function UserListItem(props: UserListItemProps) {
  const navigate = useNavigate();
  const { toggle } = React.useContext(ThemeContext);

  let caption =
    props.newMessage?.length > 0 &&
    props.newMessage.find(
      (message: any) => message.chat_room === props.chatRoom
    );

  const unreadCount = React.useMemo(() => {
    if (!props.unseenMessages?.length) return 0;
    return props.unseenMessages.filter(
      (message) => message.chat_room === props.chatRoom
    ).length;
  }, [props.chatRoom, props.unseenMessages]);

  return (
    <Stack
      className={`cursor-pointer ${
        toggle ? "user-list-item" : "user-list-light"
      } ${
        props.isSelected
          ? toggle
            ? "selected-user"
            : "selected-user-light"
          : ""
      }`}
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ px: { xs: 0.5, md: 1, xl: 2 }, py: 1 }}
      component="div"
      onClick={() => {
        if (props.onClickHandler) {
          props.onClickHandler();
        }
        navigate(`/lounge/messages/user/${props.id}`);
      }}>
      <Avatar src={props.profile} />
      <Stack direction="column">
        <Typography sx={{ color: toggle ? "#919eab" : "161c24" }}>
          {props.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: toggle ? '#919eab' : '161c24',
            fontWeight: unreadCount > 0 ? 600 : 400,
          }}
        >
          {caption ? caption.content : props.caption}
        </Typography>
      </Stack>
      {unreadCount > 0 && (
        <>
          <Box flexGrow={1} />
          <Badge
            badgeContent={unreadCount}
            color="secondary"
          />
        </>
      )}
    </Stack>
  );
}

export default UserListItem;
