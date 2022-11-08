import { Grid } from '@mui/material';

import Submenu from 'frontend/components/submenu';

const Locked = () => {
  return (
    <Grid container>
      <Submenu title="LOCKED" username="" routes={[]} noTag md={12} />
    </Grid>
  );
};

export default Locked;
