import Submenu from 'frontend/components/submenu';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TitleBlock from 'frontend/components/submenu/sections/TitleBlock';

import { Grid, Typography } from '@mui/material';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';

const SiteNotif = () => {
  const [checkboxes, setCheckboxes] = useState({
    newComment: false,
    newLikes: false,
    discountsFrom: true,
    upcomingStream: false
  });

  const handleChangeCheckboxes = (key: string, value: boolean) => {
    setCheckboxes((p) => ({ ...p, [key]: value }));
  };

  return (
    <Grid container>
      <Submenu
        title="SITE NOTIFICATIONS"
        username="Related to you and you posts"
        routes={[]}
        noTag
        md={12}
      />

      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          <Checkbox
            checked={checkboxes.newComment}
            onChange={(e) => handleChangeCheckboxes('newComment', !checkboxes.newComment)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          New comment
        </Typography>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          <Checkbox
            checked={checkboxes.newLikes}
            onChange={(e) => handleChangeCheckboxes('newLikes', !checkboxes.newLikes)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          New Likes
        </Typography>
      </GridWithBoxConteiner>

      <TitleBlock title="Subscribe the following" noTag />
      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          <Checkbox
            checked={checkboxes.discountsFrom}
            onChange={(e) => handleChangeCheckboxes('discountsFrom', !checkboxes.discountsFrom)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Discounts from users I used to follow
        </Typography>

        <Typography className="primary-text-color" variant="subtitle2">
          <Checkbox
            checked={checkboxes.upcomingStream}
            onChange={(e) => handleChangeCheckboxes('upcomingStream', !checkboxes.upcomingStream)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Upcoming stream reminders
        </Typography>
      </GridWithBoxConteiner>
    </Grid>
  );
};

export default SiteNotif;
