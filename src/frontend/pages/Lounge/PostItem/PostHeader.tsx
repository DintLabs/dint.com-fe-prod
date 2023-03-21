import moment from 'moment/moment';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

type PostHeaderProps = {
  author: UserDataInterface;
  createdAt: string | Date;
};

function PostHeader({
  author,
  createdAt,
}: PostHeaderProps) {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  return (
    <List>
      <ListItem>
        <ListItemAvatar
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/${author.custom_username}`, { replace: true })}
        >
          <Avatar src={author.profile_image} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              onClick={() =>
                navigate(`/${author.custom_username}`, { replace: true })
              }
              style={{ cursor: "pointer" }}
              variant="subtitle1"
              sx={{ color: toggle ? "text.primary" : "#161C24" }}
            >
              {author.display_name ?? author.custom_username}
            </Typography>
          }
          secondary={
            <Typography
              component="span"
              variant="caption"
              sx={{ color: "text.secondary", cursor: 'pointer' }}
              onClick={() => navigate(`/${author.custom_username}`, { replace: true })}
            >
              @{author.custom_username}
            </Typography>
          }
        />
        <Stack
          direction="column"
          alignItems="flex-end"
          justifyContent="center"
          gap={1}
        >
          <Typography
            component="span"
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            {moment(createdAt).fromNow()}
          </Typography>
        </Stack>
      </ListItem>
    </List>
  );
}

export default PostHeader;
