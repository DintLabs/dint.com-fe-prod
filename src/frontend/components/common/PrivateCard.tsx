import { Stack } from '@mui/system';
import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { Typography } from '@mui/material';

type PrivateCardProps = {
  padding: number;
};

const PrivateCard = (props: PrivateCardProps) => {
  return (
    <Stack justifyContent="center" alignItems="center" p={props?.padding}>
      <LockIcon fontSize="large" />
      <Typography>
      Please Login To Access Page Content        
</Typography>

    </Stack>
  );
};

export default PrivateCard;
