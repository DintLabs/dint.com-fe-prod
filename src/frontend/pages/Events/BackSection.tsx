import React from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { Box, Button } from '@mui/material';

type BackSectionProps = {
  btnText: string;
  onClick: () => void;
};

function BackSection({ btnText, onClick }: BackSectionProps) {
  const { toggle } = React.useContext(ThemeContext);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="end"
      sx={{
        width: '100%',
        height: '60px',
        color: toggle ? '#fff' : '#000',
        px: 1,
      }}

    >
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={<ArrowLeftIcon />}
      >
        {btnText}
      </Button>
    </Box>
  );
}

export default BackSection;
