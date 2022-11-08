import { Stack } from '@mui/system';
import React from 'react';
import LockIcon from '@mui/icons-material/Lock';

type PrivateCardProps = {
  padding: number;
};

const PrivateCard = (props: PrivateCardProps) => {
  return (
    <Stack justifyContent="center" alignItems="center" p={props?.padding}>
      <LockIcon fontSize="large" />
    </Stack>
  );
};

export default PrivateCard;
