import { Stack } from '@mui/system';
import React from 'react';

type NothingToShowProps = {
  padding: number;
  color: string;
};

const NothingToShow = (props: NothingToShowProps) => {
  return (
    <Stack 
    justifyContent="center" 
    alignItems="center" p={props?.padding} 
    color={props.color}>
      Nothing to Show
    </Stack>
  );
};

export default NothingToShow;
