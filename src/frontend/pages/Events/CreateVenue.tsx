import React from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createVenue } from 'frontend/redux/slices/event';
import { RootState, dispatch } from 'frontend/redux/store';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import moment from 'moment';

type CreateVenueFormState = {
  venueName: string;
  venueAddress: string;
  venueMapLink: string;
};

type CreateVenueProps = {
  onClose: () => void;
};

function CreateVenue({ onClose }: CreateVenueProps) {
  const { toggle } = React.useContext(ThemeContext);
  const { handleSubmit, formState, control, reset } = useForm<CreateVenueFormState>();
  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);

  const handleFormSubmit = async (formResult: CreateVenueFormState) => {
    if (!loggedInUser) {
      return;
    }

    const payload = {
      venueName: formResult.venueName,
      venueAddress: formResult.venueAddress,
      venueGmap: formResult.venueMapLink,
      user: loggedInUser.id,
      venuedataCreated: moment(new Date()).format('MM/DD/YYYY'),
    };

    const { success } = await dispatch(createVenue(payload, loggedInUser));
    if (success) {
      reset();
      onClose();
    }

    toast.dismiss();
  };

  const inputProps = {
    sx: {
      color: toggle ? '#fff' : '#000',
    },
    variant: 'filled' as any,
    fullWidth: true,
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid
        container
        spacing={2}
        sx={{
          px: 1,
          '& .MuiFilledInput-input': {
            color: toggle ? 'white' : '#161C24',
          },
          '& .MuiFilledInput-root': {
            backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#f2f2f2',
          }
        }}
      >
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="venueName"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                label="Venue Name"
                placeholder="Venue name"
              />
            )}
          />
          {formState.errors?.venueName?.type === 'required' && (
            <FormHelperText error>Venue name is required</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="venueAddress"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                label="Venue Address"
                placeholder="Put address here"
              />
            )}
          />
          {formState.errors?.venueAddress?.type === 'required' && (
            <FormHelperText error>Venue address is required</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="venueMapLink"
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                label="Address Link (Optional)"
                placeholder="Add Google Map link here"
              />
            )}
          />
        </Grid>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={8} md={4}>
            <Button variant="contained" type="submit" fullWidth>
              Create venue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateVenue;
