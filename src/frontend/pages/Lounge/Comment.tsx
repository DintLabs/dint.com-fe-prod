import { IconButton } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import moment from 'moment/moment';
import React, { useContext } from 'react';
import useRichMessage from 'frontend/hooks/useRichMessage';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

type CommentProps = {
  text: string;
  createdAt: string | Date;
};

const Comment = ({
  text,
  createdAt,
}: CommentProps) => {
  const { toggle } = useContext(ThemeContext);
  const messageContent = useRichMessage({
    text,
    className: 'like-comm mb-0',
    style: { color: toggle ? "white" : "#161C24" },
  });

  return (
    <div
      className=""
      style={{ background: "transparent" }}
    >
      <div className="d-flex flex-column">
        <div className="user d-flex flex-row justify-content-between w-100 align-items-center">
          <span>
            {messageContent}
          </span>
          <IconButton sx={{ padding: 0, color: toggle ? "#fff" : "#000" }}>
            <FavoriteBorderRoundedIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="view-comm">{moment(createdAt).fromNow()}</div>
      </div>
    </div>
  );
};

export default Comment;
