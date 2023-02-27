import * as React from 'react';

import { Grid, Switch, Typography } from '@mui/material';

import Submenu from 'frontend/components/submenu';
import { FlexCol } from 'frontend/reusable/reusableStyled';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { ThemeContext } from '../../../../contexts/ThemeContext'

interface CheckboxesInterface {
  email: boolean;
  fullMessage: boolean;
  newsletter: boolean;
  newPostsSummary: boolean;
  newStream: boolean;
  upcomingStreamReminders: boolean;
  newPrivateMessage: boolean;
  receiveLess: boolean;
  importantSubscription: boolean;
}

const TwoStepAuth = () => {
  const [checkboxes, setCheckboxes] = React.useState<CheckboxesInterface>({
    email: false,
    fullMessage: true,
    newsletter: false,
    newPostsSummary: false,
    newStream: false,
    upcomingStreamReminders: true,
    newPrivateMessage: true,
    receiveLess: true,
    importantSubscription: true
  });
  const { toggle } = React.useContext(ThemeContext);


  const handleChangeCheckboxes = (key: string, value: boolean) => {
    setCheckboxes((p) => ({ ...p, [key]: value }));
  };

  return (
    <Grid container>
      <Submenu
        title="TWO STEP AUTHENTICATION"
        username="Primary options"
        routes={[]}
        noTag
        md={12} handleOpen={undefined} handleClose={undefined}      />
      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Authenticator App
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            You can use Google Authenticator application for IOS or Android
          </Typography>
        </FlexCol>
        <Switch
          checked={checkboxes.importantSubscription}
          onChange={() =>
            handleChangeCheckboxes('importantSubscription', !checkboxes.importantSubscription)
          }
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            }
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>


     
    </Grid>
  );
};

export default TwoStepAuth;
