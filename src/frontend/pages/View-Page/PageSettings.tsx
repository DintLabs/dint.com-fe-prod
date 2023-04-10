import { CircularProgress, Grid, IconButton, InputAdornment, Stack } from '@mui/material';
import React, { useEffect, useMemo, useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiOutlineLeft } from 'react-icons/ai';

import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import PromotionCampaignModal from 'frontend/components/view-page/PromotionCampaignModal';
import FreeTrialLinkModal from 'frontend/components/view-page/FreeTrialLinkModal';
import AddBundleModal from 'frontend/components/view-page/AddBundleModal';
import { useForm } from 'react-hook-form';
import SubscriptionBundleCard from 'frontend/components/view-page/SubscriptionBundleCard';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from 'frontend/redux/store';
import { deleteBundle } from 'frontend/redux/slices/viewPage';
import {getPageByUserId, updatePage} from 'frontend/redux/slices/page';
import { LoadingButton } from '@mui/lab';
import FreeTrialCard from 'frontend/components/view-page/FreeTrialCard';
import PromotionCampaignCard from 'frontend/components/view-page/PromotionCampaignCard';
import { checkUsernameAvailability } from 'frontend/redux/actions/commonActions';
import CheckIcon from '@mui/icons-material/Check';
import { debounce } from 'lodash';
import { ThemeContext } from '../../contexts/ThemeContext';

const PageSettings = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.user.userData);
  const pageData = useSelector((state: RootState) => state?.page?.pageData);
  const viewPageData = useSelector((state: RootState) => state?.viewPage?.pageData);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: { page_name: pageData?.page_name || '' }
  });
  const watchAllFields = watch();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
    setValue: setValue2,
  } = useForm({
    mode: 'onChange',
    defaultValues: { subscribe_amount: pageData?.subscribe_amount }
  });
  const { toggle } = useContext(ThemeContext);

  const [addSubscriptionLoader, setAddSubscriptionLoader] = useState<boolean>(false);
  const [isPromotionCampaignModalOpen, setIsPromotionCampaignModalOpen] = useState<boolean>(false);
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState<boolean>(false);
  const [isAddBundleModalOpen, setIsAddBundleModalOpen] = useState<boolean>(false);
  const [selectedEditBundle, setSelectedEditBundle] = useState<number | null>();
  const [deleteBundleLoader, setDeleteBundleLoader] = useState<boolean>(false);
  const [currentEffectedBundle, setCurrentEffectedBundle] = useState<number | null>();

  const [usernameAvailabilityLoader, setUsernameAvailabilityLoader] = useState<boolean>(false);

  const [saveUsernameLoader, setSaveUsernameLoader] = useState<boolean>(false);
  const [isUsernameIsAvailable, setIsUsernameIsAvailable] = useState<boolean>(false);

  React.useEffect(() => {
    if (loggedInUser?.id) {
      dispatch(getPageByUserId(loggedInUser.id));
    }
  }, [loggedInUser]);

  React.useEffect(() => {
    if (pageData) {
      setValue('page_name', pageData.page_name);
      setValue2('subscribe_amount', pageData.subscribe_amount);
    }
  }, [pageData]);

  const handleSavePageUsername = (data: any) => {
    if (pageData?.id && loggedInUser?.id) {
      setSaveUsernameLoader(true);
      dispatch(updatePage(pageData?.id, { ...data, user: loggedInUser.id })).then(() => {
        setSaveUsernameLoader(false);
      });
    }
  };

  const handleSaveSubscriptionAmount = (data: any) => {
    if (pageData?.id && loggedInUser?.id) {
      setAddSubscriptionLoader(true);
      dispatch(updatePage(pageData?.id, { ...data, user: loggedInUser.id })).then(() => {
        setAddSubscriptionLoader(false);
      });
    }
  };

  const handlePromotionCampaignModalOpen = () => {
    setIsPromotionCampaignModalOpen(true);
  };
  const handlePromotionCampaignModalClose = () => {
    setIsPromotionCampaignModalOpen(false);
  };

  //  bundle related handlers
  const handleAddBundleModalOpen = () => {
    setIsAddBundleModalOpen(true);
  };
  const handleAddBundleModalClose = () => {
    setIsAddBundleModalOpen(false);
    setSelectedEditBundle(null);
  };
  const handleEditBundle = (bundle: any) => {
    setSelectedEditBundle(bundle);
    handleAddBundleModalOpen();
  };
  const handleDeleteBundle = (bundleId: number) => {
    if (bundleId) {
      setDeleteBundleLoader(true);
      setCurrentEffectedBundle(bundleId);
      dispatch(deleteBundle(bundleId)).then((res) => {
        if (res) {
          setDeleteBundleLoader(false);
        } else {
          setDeleteBundleLoader(false);
        }
        setCurrentEffectedBundle(null);
      });
    }
  };

  const handleFreeTrialModalOpen = () => {
    setIsFreeTrialModalOpen(true);
  };
  const handleFreeTrialModalClose = () => {
    setIsFreeTrialModalOpen(false);
  };

  const handleSearch = () => {
    if (
      watchAllFields.page_name?.trim()?.length > 2 &&
      watchAllFields.page_name.trim() !== pageData?.page_name
    ) {
      setUsernameAvailabilityLoader(true);
      dispatch(checkUsernameAvailability(watchAllFields?.page_name?.trim()))
        .then((res: { user_id?: number; page_id?: number | null }) => {
          if (res) {
            setIsUsernameIsAvailable(false);
            setUsernameAvailabilityLoader(false);
          } else {
            setIsUsernameIsAvailable(true);
            setUsernameAvailabilityLoader(false);
          }
        })
        .catch(() => {
          setUsernameAvailabilityLoader(false);
        });
    }
  };

  // to search the username availability with minimal api calls
  const usernameSearchDebounce = useMemo(() => {
    return debounce(handleSearch, 400);
  }, [watchAllFields.page_name, errors, pageData?.page_name, handleSearch]);

  useEffect(() => {
    return () => {
      usernameSearchDebounce.cancel();
    };
  });

  useEffect(() => {
    usernameSearchDebounce();
  }, [watchAllFields.page_name, errors, pageData?.page_name, usernameSearchDebounce]);

  return (
    <>
      <Stack
        direction="column"
        className="subscription-setting-container"
        sx={{ width: window.innerWidth < 1000 ? '100%' : '55%' }}
      >
        {/* header */}
        <Stack direction="row" alignItems="center" spacing={1} className="container-header">
          {window.innerWidth < 1000 ? (
            <IconButton size="small">
              <AiOutlineLeft
                className="primary-text-color"
                onClick={() => {
                  navigate(`/${viewPageData?.page_name}`);
                }}
              />
            </IconButton>
          ) : null}
          <Typography variant="h2" className="primary-text-color">
            Settings
          </Typography>
        </Stack>
        {/* body */}

        <Stack
          direction="column"
          className="container-body"
          style={{
            backgroundColor: toggle ? '#161C24' : 'white'
          }}
        >
          {/* general section */}
          <Typography variant="h3" className="primary-text-color settings-section-header">
            General
          </Typography>
          <Stack className={`${toggle ? 'settings-section-container' : 'setting-section'}`}>
            <form onSubmit={handleSubmit(handleSavePageUsername)} autoComplete="off">
              <Stack spacing={1} sx={{ borderBottom: '1px solid', p: 2 }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  className="mui-outlinedInput-with-label"
                  {...register('page_name', {
                    pattern: {
                      value: /^[a-z0-9.\-_$@*!]{3,30}$/,
                      message: 'Please enter valid username!'
                    },
                    required: 'Please enter valid username!'
                  })}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: toggle ? 'white' : '#161C24',
                    }
                  }}
                  helperText={errors?.page_name?.message as string}
                  error={!!errors?.page_name}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {usernameAvailabilityLoader ? (
                          <CircularProgress size="1.5rem" />
                        ) : (
                          <>
                            {(isUsernameIsAvailable && errors.page_name === undefined) ||
                            watchAllFields.page_name === pageData?.page_name ? (
                              <CheckIcon className="success-text-color" />
                            ) : (
                              <CloseIcon
                                className="error-text-color"
                                titleAccess="Please use different username!"
                              />
                            )}
                          </>
                        )}
                      </InputAdornment>
                    )
                  }}
                />
                <Typography variant="body2" className="secondary-text-color">
                  {`https://dint.com/${watchAllFields.page_name || ''}`}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ p: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={saveUsernameLoader}
                  disabled={
                    !isUsernameIsAvailable || watchAllFields.page_name === pageData?.page_name
                  }
                >
                  Save
                </LoadingButton>
              </Stack>
            </form>
          </Stack>

          {/* subscription section */}
          <Typography variant="h3" className="primary-text-color settings-section-header">
            Subscriptions
          </Typography>
          <Stack className={`${toggle ? 'settings-section-container' : 'setting-section'}`}>
            <form onSubmit={handleSubmit2(handleSaveSubscriptionAmount)} autoComplete="off">
              <Stack spacing={1} sx={{ borderBottom: '1px solid', p: 2 }}>
                <TextField
                  label="Price per month"
                  variant="outlined"
                  fullWidth
                  className="mui-outlinedInput-with-label"
                  {...register2('subscribe_amount', {
                    min: {
                      value: 4.99,
                      message: 'Please enter valid subscription amount' // JS only: <p>error message</p> TS only support string
                    }
                  })}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: toggle ? 'white' : '#161C24',
                    }
                  }}
                  helperText={errors2.subscribe_amount?.message as string}
                  error={!!errors2?.subscribe_amount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
                {pageData?.subscribe_amount < 4.99 ? (
                  <Typography variant="body2" className="secondary-text-color">
                    Minimum $4.99 USD
                  </Typography>
                ) : null}
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ p: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset2();
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton variant="contained" type="submit" loading={addSubscriptionLoader}>
                  Save
                </LoadingButton>
              </Stack>
            </form>
          </Stack>

          {/* PROMOTION CAMPAIGN */}
          <Stack className={`${toggle ? 'settings-section-container' : 'setting-section'}`} p={2} spacing={1}>
            <Stack>
              <Typography variant="h4" mt={2} className="primary-text-color">
                Profile promotion campaign
              </Typography>
              <Typography mt={2} className="secondary-text-color" variant="body2">
                Offer a free trial or a discounted subscription on your profile for a limited number
                of new or already expired subscribers.
              </Typography>
            </Stack>

            {viewPageData?.campaign_page?.length > 0 ? (
              <PromotionCampaignCard campaignDetails={viewPageData.campaign_page[0]} />
            ) : (
              <Button
                variant="contained"
                component="label"
                fullWidth
                onClick={handlePromotionCampaignModalOpen}
              >
                Start Promotion Campaign
              </Button>
            )}
          </Stack>

          {/* BUNDLE */}
          <Stack className={`${toggle ? 'settings-section-container' : 'setting-section'}`} spacing={1} sx={{ p: 2 }}>
            <Typography variant="h4" mt={2} className="primary-text-color">
              Subscription bundles
            </Typography>
            <Typography mt={2} className="secondary-text-color" variant="body2">
              Offer several months of subsciprtion as a discounted bundle.
            </Typography>
            {/* list of bundles */}
            {viewPageData?.subscription_tier_page?.map((bundle: any) => (
              <SubscriptionBundleCard
                key={bundle?.id}
                months={+bundle?.validity_in_months}
                discount={+bundle?.discount}
                deleteLoader={deleteBundleLoader && currentEffectedBundle === bundle?.id}
                handleEdit={() => {
                  handleEditBundle(bundle);
                }}
                handleDelete={() => {
                  handleDeleteBundle(bundle?.id);
                }}
              />
            ))}
            <Button
              variant="contained"
              component="label"
              fullWidth
              onClick={handleAddBundleModalOpen}
            >
              Add Bundle
            </Button>
          </Stack>

          {/* FREE TRIAL */}
          <Stack className={`${toggle ? 'settings-section-container' : 'setting-section'}`} spacing={1} sx={{ p: 2 }}>
            <Typography variant="h4" mt={2} className="primary-text-color">
              Free Trial Links
            </Typography>
            <Typography mt={2} className="secondary-text-color" variant="body2">
              Create and share seperate links with free trial subcsription.
            </Typography>
            {/* Free trials */}
            {viewPageData?.trial_page?.length > 0 ? (
              <Grid container className="free-trial-container">
                {viewPageData.trial_page.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    key={item?.id}
                    className="free-trial-detail-grid"
                  >
                    <FreeTrialCard
                      id={+item?.id}
                      duration={+item?.trial_duration}
                      creationDate={item?.created_at}
                      offerExpiration={+item?.offer_expiration}
                      offerLimit={+item?.offer_limit}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Button
                variant="contained"
                component="label"
                fullWidth
                onClick={handleFreeTrialModalOpen}
              >
                Create Free Trial Link
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
      {/* Promotional campaign modal */}
      <PromotionCampaignModal
        open={isPromotionCampaignModalOpen}
        handleClose={handlePromotionCampaignModalClose}
      />
      {/* Add bundle modal */}
      <AddBundleModal
        open={isAddBundleModalOpen}
        handleClose={handleAddBundleModalClose}
        bundleData={selectedEditBundle}
      />
      {/* Free trial link modal */}
      <FreeTrialLinkModal open={isFreeTrialModalOpen} handleClose={handleFreeTrialModalClose} />
    </>
  );
};

export default PageSettings;
