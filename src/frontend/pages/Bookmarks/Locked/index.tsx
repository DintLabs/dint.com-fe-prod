import { Grid } from '@mui/material';

import Submenu from 'frontend/components/submenu';

const Locked = () => {
  return (
    <Grid container>
      <Submenu title="LOCKED" username="" routes={[]} noTag md={12} handleOpen={undefined} handleClose={undefined} />
    </Grid>
  );
};

export default Locked;
