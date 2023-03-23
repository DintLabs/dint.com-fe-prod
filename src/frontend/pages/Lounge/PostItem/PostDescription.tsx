import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';
import useRichMessage from 'frontend/hooks/useRichMessage';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { pluralize } from 'frontend/utils/formatters';

type PostDescriptionProps = {
  likesCount: number;
  userName: string;
  descriptionText?: string;
  showDescription?: boolean;
};

function PostDescription({
  likesCount,
  userName,
  showDescription,
  descriptionText = '',
}: PostDescriptionProps) {
  const { toggle } = useContext(ThemeContext);
  const navigate = useNavigate();
  const messageContent = useRichMessage({
    text: descriptionText,
    style: { color: toggle ? "white" : "#161C24", fontWeight: '400 !important' },
  });

  return (
    <>
      <Box
        sx={{
          px: 3,
          marginBottom: showDescription && descriptionText ? 1 : 2,
      }}
      >
        <Typography sx={{ color: 'text.secondary' }}>
          {pluralize(likesCount, 'like', 'likes')}
        </Typography>
      </Box>

      {showDescription && descriptionText && (
        <Box sx={{ px: 3, marginBottom: 2 }}>
        <span>
            <span
              style={{ cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate(`/${userName}`)}
            >
              {`${userName} `}
            </span>
          {messageContent}
          </span>
        </Box>
      )}
    </>
  );
}

export default PostDescription;
