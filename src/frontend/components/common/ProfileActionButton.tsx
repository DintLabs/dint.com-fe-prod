import React from 'react';
import Button from '@mui/material/Button';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

type ProfileActionButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function ProfileActionButton({
  label,
  onClick,
}: ProfileActionButtonProps) {
  const { toggle } = React.useContext(ThemeContext);

  return (
    <Button
      variant="contained"
      sx={{
        color: '#353535',
        backgroundColor: toggle ? '#fff' : '#EFEFEF',
        boxShadow: 'none',
        width: '100%',
        ':hover': {
          backgroundColor: toggle ? '#fff' : '#EFEFEF',
        },
        whiteSpace: 'nowrap',
        px: 4,
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default ProfileActionButton;
