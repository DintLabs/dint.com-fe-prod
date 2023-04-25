import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { useForm, Controller } from 'react-hook-form';
import { createVenue } from 'frontend/redux/slices/event';
import { RootState, dispatch } from 'frontend/redux/store';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { Button, FormHelperText, Grid, TextField } from '@mui/material';

type CreateVenueFormState = {
  venueName: string;
  venueAddress: string;
};

type CreateVenueProps = {
  onClose: () => void;
};

const mapsApiLoader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  language: 'en',
  libraries: ['places'],
});

function CreateVenue({ onClose }: CreateVenueProps) {
  const { toggle } = React.useContext(ThemeContext);
  const { handleSubmit, formState, control, reset, setValue } = useForm<CreateVenueFormState>();
  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const addressRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    mapsApiLoader.load().then((google) => {
      const registerAutocomplete = (ref: HTMLInputElement, type: string) => {
        const options = {
          fields: ['formatted_address', 'name'],
          types: [type],
        };
        const autocomplete = new google.maps.places.Autocomplete(ref, options);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          setValue('venueName', place.name ?? '');
          setValue('venueAddress', place.formatted_address ?? '');
        });
      };

      registerAutocomplete(nameRef.current as HTMLInputElement, 'establishment');
      registerAutocomplete(addressRef.current as HTMLInputElement, 'address');
    });
  }, []);

  const handleFormSubmit = async (formResult: CreateVenueFormState) => {
    if (!loggedInUser) {
      return;
    }

    const payload = {
      venueName: formResult.venueName,
      venueAddress: formResult.venueAddress,
      venueGmap: '',
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                inputRef={nameRef}
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                inputRef={addressRef}
                label="Venue Address"
                placeholder="Put address here"
              />
            )}
          />
          {formState.errors?.venueAddress?.type === 'required' && (
            <FormHelperText error>Venue address is required</FormHelperText>
          )}
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
