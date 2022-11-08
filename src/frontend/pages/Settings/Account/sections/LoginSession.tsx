import * as React from 'react';

import { Button, Stack, Grid, Typography } from '@mui/material';

import Submenu from 'frontend/components/submenu';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';

const LoginSession = () => {
  return (
    <Grid container>
      <Submenu title="LOGIN SESSIONS" username="" routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Chrome 105.0, Mac 10.15, Apple
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            8.24.180.213 - United Station
          </Typography>
        </FlexCol>
        <FlexRow color="#00aeff">Active now</FlexRow>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{
            width: '100%',
            margin: '10px',
            padding: '10px 0 0 0'
          }}
        >
          <Button variant="outlined">CLOSE ALL SESSIONS</Button>
        </Stack>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Chrome 105.0, Mac 10.15, Apple
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            8.24.180.213 - United Station
          </Typography>
        </FlexCol>
        <FlexRow color="silver">9/12/22 12:29 pm</FlexRow>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Mobile Safari 15.6, IOS 15.6, Apple iPhone
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            8.24.180.213 - United Station
          </Typography>
        </FlexCol>
        <FlexRow color="silver">9/11/22 3:49 pm</FlexRow>
      </GridWithBoxConteiner>
    </Grid>
  );
};

export default LoginSession;
