import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

type LoaderProps = {
  loading: boolean;
};

const Loader = (props: LoaderProps) => {
  return (
    <div>
      <Backdrop className="custom-loader" open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
