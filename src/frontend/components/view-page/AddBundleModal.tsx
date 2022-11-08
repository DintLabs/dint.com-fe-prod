import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { createBundle, updateBundle } from 'frontend/redux/slices/viewPage';
import { AppDispatch, RootState } from 'frontend/redux/store';
import { BUNDLE_DURATION_OPTIONS, PROMOTION_DISCOUNT_PERCENT_OPTIONS } from 'frontend/utils';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type AddBundleModalProps = {
  open: boolean;
  bundleData?: any;
  handleClose: () => void;
};

const AddBundleModal = (props: AddBundleModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const pageData = useSelector((state: RootState) => state?.viewPage?.pageData);
  const { userData } = useSelector((state: RootState) => state.user);

  const { handleSubmit, control, setValue, reset } = useForm({
    mode: 'onChange'
  });

  const [addBundleLoader, setAddBundleLoader] = useState<boolean>(false);
  const isEdit = props?.bundleData?.id >= 0;

  useEffect(() => {
    if (isEdit) {
      setValue('discount', +props?.bundleData?.discount);
      setValue('validity_in_months', +props?.bundleData?.validity_in_months);
    }
  }, [props?.bundleData, isEdit, setValue]);

  const handleAddBundle = (data: any) => {
    if (pageData?.id && userData?.id) {
      if (isEdit) {
        //  edit bundle
        setAddBundleLoader(true);
        dispatch(updateBundle(props.bundleData?.id, { ...data, user: userData?.id })).then(
          (res: boolean) => {
            if (res) {
              setAddBundleLoader(false);
            } else {
              setAddBundleLoader(false);
            }
            handleModalClose();
          }
        );
      } else {
        // add bundle
        setAddBundleLoader(true);
        dispatch(createBundle({ ...data, user: userData?.id, page: pageData?.id })).then(
          (res: boolean) => {
            if (res) {
              setAddBundleLoader(false);
            } else {
              setAddBundleLoader(false);
            }
            handleModalClose();
          }
        );
      }
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
      <form onSubmit={handleSubmit(handleAddBundle)} autoComplete="off">
        <Stack direction="column" className="free-trial-link-modal" spacing={2}>
          {/* header */}
          <Stack direction="row">
            <Typography className="primary-text-color" textTransform="uppercase">
              {`${isEdit ? 'Update' : 'Add'} subscription bundle`}
            </Typography>
          </Stack>
          {/* body */}
          <Stack direction="column" spacing={2}>
            <Grid container>
              <Grid item sm={12} md={12} lg={6} pr={1}>
                <Controller
                  name="discount"
                  control={control}
                  rules={{
                    required: 'Please select discount percent!'
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
                            label="Discount percent"
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
                  name="validity_in_months"
                  control={control}
                  rules={{
                    required: 'Please select duration!'
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <Autocomplete
                        {...field}
                        value={
                          field.value >= 0
                            ? BUNDLE_DURATION_OPTIONS.find((option) => option.value === field.value)
                            : null
                        }
                        options={BUNDLE_DURATION_OPTIONS}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Duration"
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
            <LoadingButton variant="contained" type="submit" loading={addBundleLoader}>
              {isEdit ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddBundleModal;
