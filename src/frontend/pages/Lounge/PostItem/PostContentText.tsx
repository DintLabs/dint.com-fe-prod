import React, { useContext } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

type PostContentTextProps = {
  text: string;
};

function PostContentText({ text }: PostContentTextProps) {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: toggle
          ? theme.palette.grey['800']
          : (theme.palette.primary as any).lighter,
        minHeight: 250,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography
        component="span"
        className="like-comm"
        variant="body2"
        sx={{ color: toggle ? "#fff" : "#000" }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default PostContentText;
