import { Avatar, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useRef, useState, useLayoutEffect, useContext } from 'react';

import { useNavigate } from 'react-router';
import { getStrippedWord } from 'frontend/utils';
import coverPhoto from '../../material/images/create-page-cover-photo.png';
import SubscribeButton from '../view-page/SubscribeButton';
import ViewMoreDivider from '../common/ViewMoreDivider';
import { ThemeContext } from '../../contexts/ThemeContext';

interface SubscribedPageCardProps {
  subscription: any;
}

const SubscribedPageCard = ({ subscription }: SubscribedPageCardProps) => {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const [showLess, setShowLess] = useState<boolean>(true);
  const lastBundleRef = useRef<any>(null);

  //   to toggle the view more / less
  const handleToggleView = () => {
    setShowLess((prevState: boolean) => !prevState);
  };

  //   to scroll the card to the bottom
  const scrollToBottom = () => {
    lastBundleRef.current.scrollTop = lastBundleRef.current.scrollHeight;
  };

  //   to auto scroll the card on view more of bundles
  useLayoutEffect(() => {
    if (!showLess) {
      scrollToBottom();
    }
  }, [showLess]);

  // to navigate on the page
  const navigateOnPage = (pageName: string) => {
    navigate(`/${pageName}`);
  };

  return (
    <Box className="page-detail-card"  style={{ color: toggle ? '#121212' : '#FFFFFF'}} ref={lastBundleRef}>
      {/* page cover image */}
      <Box
        className="page-cover-picture-container full-image-container"
        sx={{ backgroundImage: `url(${subscription?.page?.cover_picture || coverPhoto})` }}
      />
      <Stack direction="column" className="page-detail-body" spacing={1}>
        {/* page profile details */}
        <Stack direction="row" spacing={1}>
          <Avatar className="page-profile-container" src={subscription?.page?.profile_picture} />
          <Stack direction="column">
            <Typography variant="body2" style={{ color: toggle ? '#FFFFFF' : '#121212'}} >{subscription?.page?.title}</Typography>
            <Typography
              variant="caption"
              className="link-text-color cursor-pointer"
              component="div"
              onClick={() => {
                navigateOnPage(subscription?.page?.page_name);
              }}
            >
              {`@${getStrippedWord(subscription?.page?.title)}`}
            </Typography>
          </Stack>
        </Stack>
        {/* action buttons */}
        {/* <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<MessageIcon />}
            className="card-action-button"
          >
            Message
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<MonetizationOnIcon />}
            className="card-action-button"
          >
            Send a tip
          </Button>
        </Stack> */}
        {/* subscribe button */}
        <SubscribeButton
          leftTitle="SUBSCRIBED"
          rightTitle={subscription?.total_amount ? `$ ${subscription?.total_amount}` : 'FOR FREE'}
          disabled
        />
        {/* expiry details */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" className="secondary-text-color">
            Expires
          </Typography>
          <Typography variant="caption" style={{ color: toggle ? '#FFFFFF' : '#121212'}} >Oct 9, 2021</Typography>
        </Stack>
        {/* view more bundles */}
        {subscription?.page?.subscription_tier_page?.length > 0 ? (
          <ViewMoreDivider
            title="View bundles"
            handleToggleView={handleToggleView}
            showLess={showLess}
          />
        ) : null}
        {!showLess ? (
          <Stack direction="column" spacing={2}>
            {subscription?.page?.subscription_tier_page?.map((bundle: any) => (
              <SubscribeButton
                key={bundle?.id}
                leftTitle={`${bundle?.validity_in_months} months (${bundle?.discount}% off)`}
                rightTitle={`$${bundle?.discount_price} total`}
                disabled
              />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};

export default SubscribedPageCard;
