import React from 'react';
import Button from '@mui/material/Button';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

type ButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function ButtonComponent({ label, onClick }: ButtonProps) {
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

export default ButtonComponent;
