import { Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';

import Submenu from 'frontend/components/submenu';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';

const MainReferrals = () => {
  const copyLink = () => {
    navigator.clipboard.writeText('Test - 123');
    toast.success('Copied!');
  };

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="REFERRAL PROGRAM" username=" " routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color labels" variant="subtitle2">
            CURRENT REFERRAL EARNINGS
          </Typography>
          <Typography className="disablied-text-color labels" variant="caption">
            Please note, if you do not reach the minimym ypur earnings will roll over tp the next
            monthly pay
          </Typography>
        </FlexCol>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color labels" variant="subtitle2">
            YOUR PERSONAL REFERRAL URL
          </Typography>
          <Typography className="disablied-text-color labels" variant="caption">
            https://dint.com/?ref=61729317
          </Typography>
        </FlexCol>
        <FlexRow color="#00aeff" onClick={copyLink}>
          COPY
        </FlexRow>
      </GridWithBoxConteiner>

      <Submenu title="" username="REFERRAL EARNINGS STATEMENT" routes={[]} noTag md={12} />
      <GridWithBoxConteiner>
        <Typography className="disablied-text-color labels" variant="caption">
          You dont not have payouts yet
        </Typography>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography
          className="primary-text-color labels"
          variant="subtitle2"
          sx={{ width: '100%' }}
        >
          <FlexRow ai="center" jc="space-between" w="100%">
            YOUR REFERRALS <SearchIcon />
          </FlexRow>
        </Typography>
      </GridWithBoxConteiner>
    </Grid>
  );
};

export default MainReferrals;
