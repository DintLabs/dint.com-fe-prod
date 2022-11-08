import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { createFreeTrial } from 'frontend/redux/slices/viewPage';
import { AppDispatch, RootState } from 'frontend/redux/store';
import { PROMOTION_OFFER_EXPIRATION_OPTIONS, PROMOTION_OFFER_LIMIT_OPTIONS } from 'frontend/utils';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type FreeTrialLinkModalProps = {
  open: boolean;
  handleClose: () => void;
};

const FreeTrialLinkModal = (props: FreeTrialLinkModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const pageData = useSelector((state: RootState) => state?.viewPage?.pageData);
  const userData = useSelector((state: RootState) => state?.user?.userData);

  const { handleSubmit, control, reset } = useForm({ mode: 'onChange' });

  const [addFreeTrialLoader, setAddFreeTrialLoader] = useState<boolean>(false);

  const handleCreateTrial = (data: any) => {
    if (pageData?.id && userData?.id) {
      setAddFreeTrialLoader(true);
      dispatch(createFreeTrial({ ...data, user: userData?.id, page: pageData?.id })).then(
        (res: boolean) => {
          if (res) {
            setAddFreeTrialLoader(false);
          } else {
            setAddFreeTrialLoader(false);
          }
          handleModalClose();
        }
      );
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
      <form onSubmit={handleSubmit(handleCreateTrial)} autoComplete="off">
        <Stack direction="column" className="free-trial-link-modal" spacing={2}>
          {/* header */}
          <Stack direction="row">
            <Typography className="primary-text-color" textTransform="uppercase">
              Free trial
            </Typography>
          </Stack>
          {/* body */}
          <Stack direction="column" spacing={2}>
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
                  name="offer_expiration"
                  control={control}
                  rules={{
                    required: 'Please select offer expiration!'
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
            <Controller
              name="trial_duration"
              control={control}
              rules={{
                required: 'Please select free trail duration!'
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
                        label="Free trial duration"
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
            <LoadingButton variant="contained" type="submit" loading={addFreeTrialLoader}>
              Create
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default FreeTrialLinkModal;
