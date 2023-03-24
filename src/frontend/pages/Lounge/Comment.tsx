import { Avatar, Box, IconButton, useTheme } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import moment from 'moment/moment';
import React, { useContext } from 'react';
import useRichMessage from 'frontend/hooks/useRichMessage';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { UserDataInterface } from '../../interfaces/reduxInterfaces';
import { useNavigate } from 'react-router';
import { convertDateToLocal } from 'frontend/utils/date';

type CommentProps = {
  text: string;
  createdAt: string | Date;
  author: UserDataInterface;
  liked: boolean;
  likesCount?: number;
  onLikeClick?: () => void;
  hideActions?: boolean;
};

const Comment = ({
  text,
  author,
  createdAt,
  hideActions,
  liked,
  likesCount,
  onLikeClick,
}: CommentProps) => {
  const { toggle } = useContext(ThemeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const messageContent = useRichMessage({
    text,
    className: 'like-comm mb-0',
    style: {
      color: toggle ? "white" : "#161C24",
      fontWeight: '400 !important',
      fontFamily: theme.typography.fontFamily,
    },
  });

  return (
    <div
      className=""
      style={{ background: "transparent" }}
    >
      <div
        className="d-flex flex-row align-items-start"
        style={{ gap: '8px', marginBottom: '5px' }}
      >
        <Avatar
          src={author.profile_image}
          sx={{
            height: 35,
            width: 35,
            marginTop: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/${author.custom_username}`)}
        />
        <div className="d-flex flex-column flex-grow-1">
          <span>
            <span
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                color: toggle ? "white" : "#161C24",
                fontFamily: theme.typography.fontFamily,
            }}
              onClick={() => navigate(`/${author.custom_username}`)}
            >
              {`${author.custom_username} `}
            </span>
            {messageContent}
          </span>
          <div className="view-comm">
            {moment(convertDateToLocal(createdAt)).fromNow()}
          </div>
        </div>
        <IconButton
          onClick={onLikeClick}
          sx={{
            padding: 0,
            marginTop: '5px',
            color: toggle ? "#fff" : "#000",
            visibility: hideActions ? 'hidden' : 'initial',
        }}
        >
          <Box display="flex" gap="4px" alignItems="center" className="view-comm">
            {liked
              ? <FavoriteRoundedIcon fontSize="small" style={{ color: 'red' }} />
              : <FavoriteBorderRoundedIcon fontSize="small" />
            }
            {typeof likesCount === 'number' && likesCount}
          </Box>
        </IconButton>
      </div>
    </div>
  );
};

export default Comment;
