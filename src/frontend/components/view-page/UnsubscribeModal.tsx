import {
  Autocomplete,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { getUnsubscribeReasonObject, UNSUBSCRIBE_REASONS_OPTIONS } from 'frontend/utils';
import { dispatch } from 'frontend/redux/store';
import { unsubscribeToPage } from 'frontend/redux/slices/viewPage';

type UnsubscribeModalProps = {
  open: boolean;
  handleClose: () => void;
  subscriptionId: number | null;
};

type UnsubscribeFormValues = {
  reject_reason: number;
};

const UnsubscribeModal = (props: UnsubscribeModalProps) => {
  const { handleSubmit, control, reset } = useForm<UnsubscribeFormValues>({
    mode: 'onChange'
  });
  const [unsubscribeLoader, setUnsubscribeLoader] = useState<boolean>(false);

  const handleUnsubscribe: SubmitHandler<UnsubscribeFormValues> = (data) => {
    console.log({ ...data, subscriptionId: props?.subscriptionId });
    if (props?.subscriptionId) {
      setUnsubscribeLoader(true);
      dispatch(unsubscribeToPage(props?.subscriptionId, data))
        .then((res: boolean) => {
          if (res) {
            setUnsubscribeLoader(false);
          } else {
            setUnsubscribeLoader(false);
          }
          handleModalClose();
          setUnsubscribeLoader(false);
        })
        .catch(() => {
          setUnsubscribeLoader(false);
        });
    }
  };

  const handleModalClose = () => {
    props.handleClose();
    reset();
  };

  return (
    <Modal
      open={props?.open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack className="unsubscribe-modal" direction="column" spacing={1}>
        {/* header */}
        <Stack
          className="modal-header"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className="primary-text-color">Unsubscribe</Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <form autoComplete="off" onSubmit={handleSubmit(handleUnsubscribe)}>
          {/* body */}
          <Stack direction="column" spacing={2} p={2}>
            <Typography className="primary-text-color">
              Are you sure you want to cancel your subscription?
            </Typography>
            <Controller
              name="reject_reason"
              control={control}
              rules={{
                required: 'Please select any reason!'
              }}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    {...field}
                    value={field?.value ? getUnsubscribeReasonObject(field?.value) : null}
                    options={UNSUBSCRIBE_REASONS_OPTIONS}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="mui-outlinedInput-with-label"
                        label="Reason for the cancellation"
                        variant="outlined"
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
          <Stack direction="row" spacing={1} justifyContent="flex-end" px={2} pb={2}>
            <Button variant="outlined" onClick={handleModalClose}>
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit" loading={unsubscribeLoader}>
              Unsubscribe
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default UnsubscribeModal;
