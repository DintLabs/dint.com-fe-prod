import { Stack } from '@mui/system';
import React from 'react';

type NothingToShowProps = {
  padding: number;
};

const NothingToShow = (props: NothingToShowProps) => {
  return (
    <Stack justifyContent="center" alignItems="center" p={props?.padding}>
      Nothing to Show
    </Stack>
  );
};

export default NothingToShow;
