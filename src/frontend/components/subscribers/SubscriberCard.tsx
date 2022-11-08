import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';

import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { getTimeInMMMDDyyyyFomat, getUnsubscribeReasonLabelFromValue } from 'frontend/utils';
import { ThemeContext } from '../../contexts/ThemeContext';

type SubscriberCardProps = {
  subscriber: any;
};

const SubscriberCard = ({ subscriber }: SubscriberCardProps) => {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const navigateOnUserProfilePage = (userName: string) => {
    navigate(`/${userName}`);
  };

  return (
    <Box className="user-detail-card" style={{ backgroundColor: toggle ? '#121212' : '#adb7c542' }} >
      {/* user profile */}
      <Stack direction="row" spacing={1} className="user-profile-container">
        <Avatar src={subscriber?.user?.profile_image} />
        <Stack direction="column">
          <Typography variant="body2" style={{ color: toggle ? '#FFFFFF' : '#000000' }}>{subscriber?.user?.display_name}</Typography>
          <Typography
            variant="caption"
            className="link-text-color cursor-pointer"
            component="div"
            onClick={() => {
              navigateOnUserProfilePage(subscriber?.user?.custom_username);
            }}
          >
            {`@${subscriber?.user?.custom_username}`}
          </Typography>
        </Stack>
      </Stack>
      {/* action buttons */}
      {/* <Stack direction="row" spacing={1} justifyContent="space-around" className="action-buttons">
        <Button variant="contained" size="small" startIcon={<NotInterestedIcon />}>
          Mute
        </Button>
        <Button variant="contained" size="small" startIcon={<PercentIcon />}>
          Discount
        </Button>
        <Button variant="contained" size="small" startIcon={<MessageIcon />}>
          Message
        </Button>
      </Stack> */}
      {/* subscription details */}
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" className="secondary-text-color">
            Current Subscription
          </Typography>
          <Typography variant="body2" style={{ color: toggle ? '#FFFFFF' : '#000000' }} >{`$ ${subscriber?.total_amount}`}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" className="secondary-text-color">
            Started
          </Typography>
          <Typography variant="body2"style={{ color: toggle ? '#FFFFFF' : '#000000' }} >{getTimeInMMMDDyyyyFomat(subscriber?.created_at)}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" className="secondary-text-color">
            Total Duration
          </Typography>
          <Typography variant="body2" style={{ color: toggle ? '#FFFFFF' : '#000000' }} >{`${subscriber?.total_duration} ${
            subscriber?.total_duration > 1 ? 'Days' : 'Day'
          }`}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" className="secondary-text-color">
            Expires
          </Typography>
          <Typography variant="body2" style={{ color: toggle ? '#FFFFFF' : '#000000' }} >
            {getTimeInMMMDDyyyyFomat(subscriber?.user_subscription_ends_on)}
          </Typography>
        </Stack>
        {subscriber?.reject_reason ? (
          <>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" className="secondary-text-color">
                Reason
              </Typography>
              <Typography variant="body2">
                {getUnsubscribeReasonLabelFromValue(+subscriber?.reject_reason)}
              </Typography>
            </Stack>
          </>
        ) : null}
      </Stack>
    </Box>
  );
};

export default SubscriberCard;
