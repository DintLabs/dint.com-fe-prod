import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackIconButtonProps = {
  onClick?: () => void;
};

function BackIconButton({ onClick }: BackIconButtonProps) {
  const navigate = useNavigate();
  const handleBack = React.useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  }, [navigate, onClick])

  return (
    <IconButton
      onClick={handleBack}
      sx={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        color: '#fff',
        backgroundColor: '#000',
        opacity: 0.8,
        '&:hover': {
          backgroundColor: '#000',
        }
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackIconButton;

