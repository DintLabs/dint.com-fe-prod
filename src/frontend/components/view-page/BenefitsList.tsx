import { Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const BenefitisList = () => {
  return (
    <Stack direction="column" spacing={1}>
      <Typography className="secondary-text-color" textTransform="uppercase" variant="body2">
        Subscribe and get these benefits:
      </Typography>
      <Stack direction="row" spacing={1}>
        <CheckIcon className="link-text-color" />
        <Typography className="primary-text-color" variant="body2">
          Full access to this page's content
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <CheckIcon className="link-text-color" />
        <Typography variant="body2" className="primary-text-color">
          Direct message with this user
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <CheckIcon className="link-text-color" />
        <Typography variant="body2" className="primary-text-color">
          Cancel your subscription at any time
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BenefitisList;
