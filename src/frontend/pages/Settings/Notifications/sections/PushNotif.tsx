import { Switch, Typography } from '@mui/material';
import Submenu from 'frontend/components/submenu';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol } from 'frontend/reusable/reusableStyled';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';

const PushNotif = () => {
  const [isPush, setIsPush] = useState(false);
  const { toggle } = useContext(ThemeContext);

  return (
    <>
      <Submenu title="PUSH NOTIFICATIONS" username="" routes={[]} noTag md={12} />
      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Push notifications
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            Get push notifications to find out what\'s going on when you\'re not on Dint.com. You
            can turn them off any time
          </Typography>
        </FlexCol>
        <Switch
          checked={isPush}
          onChange={() => setIsPush(!isPush)}
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            }
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>
    </>
  );
};

export default PushNotif;
