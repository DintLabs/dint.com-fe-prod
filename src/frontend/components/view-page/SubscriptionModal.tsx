import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useDispatch } from "frontend/redux/store";

import {
  fetchViewPageData,
  subscribeToPage,
} from "frontend/redux/slices/viewPage";
import coverPhoto from "../../material/images/create-page-cover-photo.png";
import BenefitisList from "./BenefitsList";
import SubscribeButton from "./SubscribeButton";
import ViewMoreDivider from "../common/ViewMoreDivider";
import _axios from "frontend/api/axios";
import { toast } from "react-toastify";
import AuthGuard from "frontend/guards/AuthGuard";
import { useNavigate } from "react-router-dom";
import LowBalanceModal from "../common/LowBalanceModal";

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
  const { balance } = useSelector((state: RootState) => state.walletState);

  const navigate = useNavigate();

  const [subscriptionButtonDetails, setSubscriptionButtonDetails] =
    useState<any>(null);
  const [showLess, setShowLess] = useState<boolean>(true);
  const [bundles, setBundles] = useState<any>(null);
  const [subscribeLoader, setSubscribeLoader] = useState<boolean>(false);
  const [bundleSubscribeLoader, setBundleSubscribeLoader] =
    useState<boolean>(false);
  const [selectedSubscriptionBundle, setSelectedSubscripitionBundle] = useState<
    number | null
  >(null);
  const [subsTxn, setSubsTxn] = useState<any>();
  const [subsAmount, setSubsAmount] = useState<any>();
  const [lowBalance, setLowBalance] = useState(false);


  const findSelectedBundle = (id: any) => {
    return props?.pageData?.subscription_tier_page?.find(
      (bundle: any) => bundle?.id === id
    );
  };
  const filterUnselectedBundles = (id: any) => {
    return props?.pageData?.subscription_tier_page?.filter(
      (bundle: any) => bundle?.id !== id
    );
  };

  // to set the buttons according to the subscribe button
  useEffect(() => {
    switch (props.subscription?.subscription_type) {
      case 1:
        setSubscriptionButtonDetails({
          leftTitle: "Subscribe",
          rightTitle: "For free",
        });
        setBundles(props?.pageData?.subscription_tier_page);
        setSubsAmount(0);
        break;
      case 2:
        setSubscriptionButtonDetails({
          leftTitle: "Subscribe",
          rightTitle: `$${props?.pageData?.subscribe_amount} per month`,
        });
        setBundles(props?.pageData?.subscription_tier_page);
        setSubsAmount(props?.pageData?.subscribe_amount);
        break;
      case 3:
        setSubscriptionButtonDetails({
          leftTitle: `31 Days (${props?.pageData?.campaign_page?.[0]?.discount_percentage}% off)`,
          rightTitle: `$${props?.pageData?.campaign_page?.[0]?.discount_price} per month`,
        });
        setBundles(props?.pageData?.subscription_tier_page);
        setSubsAmount(props?.pageData?.campaign_page?.[0]?.discount_price);
        break;
      case 4:
        setSubscriptionButtonDetails({
          leftTitle: `${
            findSelectedBundle(props?.subscription?.subscription_tier)
              ?.validity_in_months
          } Months (${
            findSelectedBundle(props?.subscription?.subscription_tier)?.discount
          }% off)`,
          rightTitle: `$${
            findSelectedBundle(props?.subscription?.subscription_tier)
              ?.discount_price
          } per month`,
        });
        setBundles(
          filterUnselectedBundles(props?.subscription?.subscription_tier)
        );
        setSubsAmount(
          findSelectedBundle(props?.subscription?.subscription_tier)
            ?.discount_price
        );
        break;
    }
  }, [props?.pageData?.subscription_tier_page, props?.subscription]);

  const handleSubscribe = async () => {
    console.log({
      ...props?.subscription,
      page: props?.pageData?.id,
      user: userData?.id,
    });
    if (userData?.id && props?.pageData?.id) {
      setSubscribeLoader(true);
      const amount = subsAmount;
      if (amount == 0) {
        dispatch(
          subscribeToPage({
            ...props?.subscription,
            page: props?.pageData?.id,
            user: userData?.id,
          })
        ).then((res: boolean) => {
          if (res) {
            setSubscribeLoader(false);
            dispatch(fetchViewPageData(props?.pageData?.id));
          } else {
            setSubscribeLoader(false);
          }
          handleModalClose();
        });
      } else {
        subscribeWithTxn(amount);
      }
    } else {
      navigate(`/auth/login`);
    }
  };

  const handleSubscribeBundle = async (subscription_tier: number) => {
    console.log({
      subscription_type: 4,
      subscription_tier,
      page: props?.pageData?.id,
      user: userData?.id,
    });
    setSelectedSubscripitionBundle(subscription_tier);
    const temp = props?.pageData?.subscription_tier_page.find((el: any) => {
      return el.id == subscription_tier;
    });

    const amount = await temp.discount_price;
    setSubsAmount(temp.discount_price);

    if (userData?.id && props?.pageData?.id) {
      subscribeWithTxn(amount);
    } else {
      navigate(`/auth/login`);
    }
  };

  const subscribeWithTxn = async (amount: any) => {
    const toastId = toast.loading("Subscribing...");
    if (amount < balance) {
      setSubscribeLoader(true);

      const sendDetail = {
        sender_id: userData?.id,
        reciever_id: props?.pageData?.user?.id,
        amount: amount,
      };

      if (sendDetail) {
        await _axios
          .post(`api/user/send-dint/`, sendDetail)
          .then((response: any) => {
            setSubsTxn(response.data);
            if (response.data.code == 201) {
              toast.update(toastId, {
                render: "Subscribed!",
                type: "success",
                isLoading: false,
              });
              dispatch(
                subscribeToPage({
                  ...props?.subscription,
                  page: props?.pageData?.id,
                  user: userData?.id,
                })
              ).then((res: boolean) => {
                if (res) {
                  setSubscribeLoader(false);
                  dispatch(fetchViewPageData(props?.pageData?.id));
                } else {
                  setSubscribeLoader(false);
                }
                handleModalClose();
              });
            } else {
              setSubscribeLoader(false);
              toast.update(toastId, {
                render: "Something went wrong!",
                type: "error",
                isLoading: false,
              });
            }
          })
          .catch((error: any) => {
            setSubscribeLoader(false);
            console.log(error);
            toast.update(toastId, {
              render: "Something went wrong!",
              type: "error",
              isLoading: false,
            });
          });
      }
    } else {
      toast.update(toastId, {
        render: `Insufficient Funds!`,
        type: "error",
        isLoading: false,
      });
      setSubscribeLoader(false);
      setLowBalance(true);
    }
    setTimeout(() => toast.dismiss(), 2000);
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
  const handleConfirmation = () => {
    setLowBalance(false);
  };
  return (
    <>
      <Modal
        open={props.open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Stack className="subscription-modal" direction="column" spacing={1}>
          <Stack
            className="subscription-modal-body"
            direction="column"
            spacing={1}>
            <Box
              className="cover-picture-container full-image-container"
              sx={{
                backgroundImage: `url(${
                  props?.pageData?.cover_picture || coverPhoto
                })`,
              }}
            />
            {/* body section */}
            <Stack
              direction="column"
              spacing={1}
              className="subscription-detail-container">
              <Stack direction="row" spacing={1}>
                <Avatar
                  className="page-profile-container"
                  src={props?.pageData?.profile_picture}
                />
                <Stack direction="column">
                  <Typography className="primary-text-color" variant="body2">
                    {props?.pageData?.title}
                  </Typography>
                  <Typography
                    className="secondary-text-color"
                    variant="caption">
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
                    loading={
                      bundleSubscribeLoader &&
                      selectedSubscriptionBundle === +bundle?.id
                    }
                  />
                ))}
              </Stack>
            ) : null}
          </Stack>

          {/* footer */}
          <Stack direction="row" justifyContent="flex-end" px={1} pb={1}>
            <Button
              variant="outlined"
              size="small"
              disabled={subscribeLoader}
              onClick={handleModalClose}>
              Close
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <LowBalanceModal
        isOpen={lowBalance}
        handleClose={() => handleConfirmation()}
      />
    </>
  );
};

export default SubscriptionModal;
