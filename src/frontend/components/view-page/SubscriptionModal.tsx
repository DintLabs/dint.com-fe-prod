import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useDispatch } from 'frontend/redux/store';

import { fetchViewPageData, subscribeToPage } from 'frontend/redux/slices/viewPage';
import coverPhoto from '../../material/images/create-page-cover-photo.png';
import BenefitisList from './BenefitsList';
import SubscribeButton from './SubscribeButton';
import ViewMoreDivider from '../common/ViewMoreDivider';

type SubscriptionModalProps = {
  pageData: any;
  pageName: string | null;
  coverPicture: string;
  profilePicture: string;
  open: boolean;
  handleClose: () => void;
  subscription: any;
};

const SubscriptionModal = (props: SubscriptionModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state?.user?.userData);

  const [subscriptionButtonDetails, setSubscriptionButtonDetails] = useState<any>(null);
  const [showLess, setShowLess] = useState<boolean>(true);
  const [bundles, setBundles] = useState<any>(null);
  const [subscribeLoader, setSubscribeLoader] = useState<boolean>(false);
  const [bundleSubscribeLoader, setBundleSubscribeLoader] = useState<boolean>(false);
  const [selectedSubscriptionBundle, setSelectedSubscripitionBundle] = useState<number | null>(
    null
  );

  const findSelectedBundle = (id: any) => {
    return props?.pageData?.subscription_tier_page?.find((bundle: any) => bundle?.id === id);
  };
  const filterUnselectedBundles = (id: any) => {
    return props?.pageData?.subscription_tier_page?.filter((bundle: any) => bundle?.id !== id);
  };

  // to set the buttons according to the subscribe button
  useEffect(() => {
    switch (props.subscription?.subscription_type) {
      case 1:
        setSubscriptionButtonDetails({ leftTitle: 'Subscribe', rightTitle: 'For free' });
        setBundles(props?.pageData?.subscription_tier_page);
        break;
      case 2:
        setSubscriptionButtonDetails({
          leftTitle: 'Subscribe',
          rightTitle: `$${props?.pageData?.subscribe_amount} per month`
        });
        setBundles(props?.pageData?.subscription_tier_page);
        break;
      case 3:
        setSubscriptionButtonDetails({
          leftTitle: `31 Days (${props?.pageData?.campaign_page?.[0]?.discount_percentage}% off)`,
          rightTitle: `$${props?.pageData?.campaign_page?.[0]?.discount_price} per month`
        });
        setBundles(props?.pageData?.subscription_tier_page);
        break;
      case 4:
        setSubscriptionButtonDetails({
          leftTitle: `${
            findSelectedBundle(props?.subscription?.subscription_tier)?.validity_in_months
          } Months (${findSelectedBundle(props?.subscription?.subscription_tier)?.discount}% off)`,
          rightTitle: `$${
            findSelectedBundle(props?.subscription?.subscription_tier)?.discount_price
          } per month`
        });
        setBundles(filterUnselectedBundles(props?.subscription?.subscription_tier));
        break;
    }
  }, [props?.pageData?.subscription_tier_page, props?.subscription]);

  const handleSubscribe = () => {
    console.log({ ...props?.subscription, page: props?.pageData?.id, user: userData?.id });
    if (userData?.id && props?.pageData?.id) {
      setSubscribeLoader(true);
      dispatch(
        subscribeToPage({ ...props?.subscription, page: props?.pageData?.id, user: userData?.id })
      ).then((res: boolean) => {
        if (res) {
          setSubscribeLoader(false);
          dispatch(fetchViewPageData(props?.pageData?.id));
        } else {
          setSubscribeLoader(false);
        }
        handleModalClose();
      });
    }
  };

  const handleSubscribeBundle = (subscription_tier: number) => {
    console.log({
      subscription_type: 4,
      subscription_tier,
      page: props?.pageData?.id,
      user: userData?.id
    });
    setSelectedSubscripitionBundle(subscription_tier);
    if (userData?.id && props?.pageData?.id) {
      setBundleSubscribeLoader(true);
      dispatch(
        subscribeToPage({
          subscription_type: 4,
          subscription_tier,
          page: props?.pageData?.id,
          user: userData?.id
        })
      ).then((res: boolean) => {
        if (res) {
          setBundleSubscribeLoader(false);
          dispatch(fetchViewPageData(props?.pageData?.id));
        } else {
          setBundleSubscribeLoader(false);
        }
        handleModalClose();
      });
    }
  };

  const handleToggleView = () => {
    setShowLess((prevState: boolean) => !prevState);
  };
  const handleModalClose = () => {
    props.handleClose();
    resetStates();
  };

  const resetStates = () => {
    setShowLess(true);
    setBundles(null);
    setSubscriptionButtonDetails(null);
    setSelectedSubscripitionBundle(null);
  };
  return (
    <Modal
      open={props.open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack className="subscription-modal" direction="column" spacing={1}>
        <Stack className="subscription-modal-body" direction="column" spacing={1}>
          <Box
            className="cover-picture-container full-image-container"
            sx={{ backgroundImage: `url(${props?.pageData?.cover_picture || coverPhoto})` }}
          />
          {/* body section */}
          <Stack direction="column" spacing={1} className="subscription-detail-container">
            <Stack direction="row" spacing={1}>
              <Avatar className="page-profile-container" src={props?.pageData?.profile_picture} />
              <Stack direction="column">
                <Typography className="primary-text-color" variant="body2">
                  {props?.pageData?.title}
                </Typography>
                <Typography className="secondary-text-color" variant="caption">
                  {/* @page */}
                </Typography>
              </Stack>
            </Stack>
            <BenefitisList />
            <SubscribeButton
              leftTitle={subscriptionButtonDetails?.leftTitle}
              rightTitle={subscriptionButtonDetails?.rightTitle}
              handleClick={handleSubscribe}
              loading={subscribeLoader}
            />
          </Stack>
          {/* view bundles section */}
          {bundles?.length > 0 ? (
            <ViewMoreDivider
              title="View bundles"
              showLess={showLess}
              handleToggleView={handleToggleView}
            />
          ) : null}
          {/* list of bundles */}
          {!showLess ? (
            <Stack direction="column" spacing={2} p={1}>
              {bundles?.map((bundle: any) => (
                <SubscribeButton
                  key={bundle?.id}
                  leftTitle={`${bundle?.validity_in_months} months (${bundle?.discount}% off)`}
                  rightTitle={`$${bundle?.discount_price} total`}
                  handleClick={() => {
                    handleSubscribeBundle(+bundle?.id);
                  }}
                  loading={bundleSubscribeLoader && selectedSubscriptionBundle === +bundle?.id}
                />
              ))}
            </Stack>
          ) : null}
        </Stack>

        {/* footer */}
        <Stack direction="row" justifyContent="flex-end" px={1} pb={1}>
          <Button variant="outlined" size="small" onClick={handleModalClose}>
            Close
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default SubscriptionModal;
