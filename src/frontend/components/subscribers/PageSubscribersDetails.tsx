import { Grid } from '@mui/material';
import React from 'react';
import SubscriberCard from './SubscriberCard';

type PageSubscribersDetailsProps = {
  subscribers: any[];
};

const PageSubscribersDetails = (props: PageSubscribersDetailsProps) => {
  return (
    <Grid container className="subscription-details-container">
      {props?.subscribers?.map((subscriber: any) => (
        <Grid key={subscriber?.id} item sm={12} md={6} lg={4} className="user-details-grid">
          <SubscriberCard subscriber={subscriber} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PageSubscribersDetails;
