import { Checkbox, Typography } from '@mui/material';
import Submenu from 'frontend/components/submenu';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { useState } from 'react';

const SmsNotif = () => {
  const [checked_1, setChecked_1] = useState(true);
  return (
    <>
      <Submenu
        title="SMS NOTIFICATIONS"
        username="Subscriptions and following"
        routes={[]}
        noTag
        md={12}
      />
      <FlexRow p="0 0 0 4px">
        <Typography className="primary-text-color labels" variant="subtitle2">
          <Checkbox
            checked={checked_1}
            onChange={(e) => setChecked_1(!!e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          New Stream
        </Typography>
      </FlexRow>
    </>
  );
};

export default SmsNotif;
