import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { createCampaign } from 'frontend/redux/slices/viewPage';
import { AppDispatch, RootState } from 'frontend/redux/store';
import {
  PROMOTION_DISCOUNT_PERCENT_OPTIONS,
  PROMOTION_OFFER_EXPIRATION_OPTIONS,
  PROMOTION_OFFER_LIMIT_OPTIONS,
  SubscriberTypeConfigObject
} from 'frontend/utils';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type PromotionCampaignModalProps = {
  open: boolean;
  handleClose: () => void;
};

// const PromotionTypeConfigObject = [
//   { id: 1, title: 'Free trial' },
//   { id: 2, title: 'First month discount' }
// ];

const PromotionCampaignModal = (props: PromotionCampaignModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const pageData = useSelector((state: RootState) => state?.viewPage?.pageData);
  const userData = useSelector((state: RootState) => state?.user?.userData);

  // const selectedPromotionType = 2;

  const [selectedSubscriberType, setSelectedSubscriberType] = useState<number>(1);
  const [campaignLoader, setCampaignLoader] = useState<boolean>(false);

  const handleCreatePromotion = (data: any) => {
    if (pageData?.id && userData?.id) {
      setCampaignLoader(true);
      dispatch(
        createCampaign({
          ...data,
          campaign_type: selectedSubscriberType,
          user: userData?.id,
          page: pageData?.id
        })
      ).then((res: boolean) => {
        if (res) {
          setCampaignLoader(false);
        } else {
          setCampaignLoader(false);
        }
        handleModalClose();
      });
    }
  };

  const handleModalClose = () => {
    props.handleClose();
    reset();
  };

  return (
    <Modal
      open={props.open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack direction="column" className="promotion-campaign-modal">
        <form onSubmit={handleSubmit(handleCreatePromotion)} autoComplete="off">
          {/* header */}
          <Stack direction="column" className="promotion-modal-header" spacing={2}>
            <Stack direction="row">
              <Typography className="primary-text-color" textTransform="uppercase">
                Promotion Campaign For
              </Typography>
            </Stack>
            {/* subscriber's status */}
            <Stack direction="row" spacing={1}>
              {SubscriberTypeConfigObject.map((subscriberType) => (
                <Chip
                  key={subscriberType.id}
                  label={subscriberType.title}
                  clickable
                  onClick={() => {
                    setSelectedSubscriberType(subscriberType.id);
                  }}
                  className={
                    selectedSubscriberType === subscriberType.id
                      ? 'active-chip-color'
                      : ' inactive-chip-color'
                  }
                />
              ))}
            </Stack>
          </Stack>
          {/* body */}
          <Stack className="promotion-modal-body" spacing={2}>
            {/* filter  */}

            <Grid container>
              <Grid item sm={12} md={12} lg={6} pr={1}>
                <Controller
                  name="offer_limit"
                  control={control}
                  rules={{
                    required: 'Please select offer limit!'
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <Autocomplete
                        {...field}
                        value={
                          field.value >= 0
                            ? PROMOTION_OFFER_LIMIT_OPTIONS.find(
                                (option) => option.value === field.value
                              )
                            : null
                        }
                        options={PROMOTION_OFFER_LIMIT_OPTIONS}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Offer limit"
                            variant="outlined"
                            className="mui-outlinedInput-with-label"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data?.value)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item sm={12} md={12} lg={6} pl={1}>
                <Controller
                  name="offer_expiration_in_days"
                  control={control}
                  rules={{
                    required: 'Please select offer expiration period!'
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <Autocomplete
                        {...field}
                        value={
                          field.value >= 0
                            ? PROMOTION_OFFER_EXPIRATION_OPTIONS.find(
                                (option) => option.value === field.value
                              )
                            : null
                        }
                        options={PROMOTION_OFFER_EXPIRATION_OPTIONS}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Offer expiration"
                            variant="outlined"
                            className="mui-outlinedInput-with-label"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data?.value)}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            <Stack sx={{ flexDirection: 'column' }}>
              {/* {selectedPromotionType === 0 ? (
                <Autocomplete
                  key="free-trial-duration"
                  options={PROMOTION_OFFER_EXPIRATION_OPTIONS}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Free trial duration"
                      variant="outlined"
                      className="mui-outlinedInput-with-label"
                    />
                  )}
                />
              ) : ( */}
              <Controller
                name="discount_percentage"
                control={control}
                rules={{
                  required: 'Please select discount percentage!'
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Autocomplete
                      {...field}
                      value={
                        field.value >= 0
                          ? PROMOTION_DISCOUNT_PERCENT_OPTIONS.find(
                              (option) => option.value === field.value
                            )
                          : null
                      }
                      options={PROMOTION_DISCOUNT_PERCENT_OPTIONS}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Discount percentage"
                          variant="outlined"
                          className="mui-outlinedInput-with-label"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                      onChange={(_, data) => field.onChange(data?.value)}
                    />
                  );
                }}
              />
              {/* )} */}
            </Stack>
            <TextField
              placeholder="Messsage (optional)"
              fullWidth
              {...register('message')}
              helperText={errors.message?.message as string}
              error={!!errors?.message}
            />
          </Stack>
          {/* footer */}
          <Stack
            className="promotion-modal-footer"
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >
            <Button variant="outlined" onClick={handleModalClose}>
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit" loading={campaignLoader}>
              Create
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default PromotionCampaignModal;
