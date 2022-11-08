import { Grid } from '@mui/material';
import React from 'react';
import SubscribedPageCard from './SubscribedPageCard';

type UserSubscriptionDetailsProps = {
  subscriptions: any[];
};

const UserSubscriptionDetails = (props: UserSubscriptionDetailsProps) => {
  return (
    <Grid container className="subscription-details-container">
      {props?.subscriptions?.map((subscription: any) => (
        <Grid key={subscription?.id} item sm={12} md={6} lg={4} className="page-detail-grid">
          <SubscribedPageCard subscription={subscription} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserSubscriptionDetails;
