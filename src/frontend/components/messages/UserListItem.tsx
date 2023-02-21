import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

type UserListItemProps = {
  id: number;
  profile: string | any;
  name: string;
  caption: string;
  isSelected?: boolean;
  newMessage: any;
  chatRoom: any;
  onClickHandler?: () => void;
  unseenMessages:any;
};

function UserListItem(props: UserListItemProps) {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  let caption =
    props.newMessage?.length > 0 &&
    props.newMessage.find(
      (message: any) => message.chat_room === props.chatRoom
    );

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
          sx={{ color: toggle ? "#919eab" : "161c24" }}>
          {caption ? caption.content : props.caption}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default UserListItem;
