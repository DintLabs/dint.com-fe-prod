import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from 'frontend/redux/store';
import { uploadMedia } from 'frontend/services/mediaService';
import { createEvent, updateEvent } from 'frontend/redux/slices/event';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';
import { IEvent } from 'frontend/types/event';
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import CreateVenue from './CreateVenue';
import BackSection from './BackSection';

const DEFAULT_IMAGE_URL = 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

export type CreateOrUpdateEventProps = {
  event?: IEvent;
  onBack: () => void;
  onAfterEventUpdate?: (updatedEvent: IEvent) => void;
};

type CreateOrUpdateEventFormState = {
  eventName: string;
  venueName: string;
  eventDescription: string;
  eventDate: moment.Moment;
  eventFrequency: string;
  eventStartTime: moment.Moment;
  eventEndTime: moment.Moment;
  network: number;
  tokenType: string;
  tokenAddress: string;
  tokenName: string;
  balanceFrequency: number;
};

function CreateOrUpdateEvent({
  event,
  onBack,
  onAfterEventUpdate = () => {}
}: CreateOrUpdateEventProps) {
  const { toggle } = React.useContext(ThemeContext);
  const [eventImage, setEventImage] = React.useState<File | null>(null);
  const [createVenueOpened, setCreateVenueOpened] = React.useState<boolean>(false);
  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);
  const { userVenues } = useSelector((rootState: RootState) => rootState.event);
  const {
    handleSubmit,
    formState,
    control,
    reset,
  } = useForm<CreateOrUpdateEventFormState>({
    defaultValues: {
      eventName: event?.eventName ?? '',
      venueName: event?.valueName ?? '',
      eventDescription: event?.eventDescription ?? '',
      eventDate: event?.eventDate ? moment(event.eventDate) : moment(new Date()).add(1, 'days'),
      eventFrequency: event?.eventFequency ?? 'Once',
      eventStartTime: event?.eventstartTime
        ? moment(event.eventstartTime, 'HH:mm:ss')
        : moment(new Date()).add(1, 'hours'),
      eventEndTime: event?.eventEndTime
        ? moment(event.eventEndTime, 'HH:mm:ss') : moment(new Date()).add(2, 'hours'),
      network: 2,
      tokenType: 'ERC_21',
      tokenAddress: process.env.REACT_APP_DINT_CONTRACT_ADDR ?? '',
      tokenName: 'DINT',
      balanceFrequency: 1,
    }
  });

  const handleBack = () => {
    if (createVenueOpened) {
      setCreateVenueOpened(false);
    } else {
      onBack();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setEventImage(file);
  }

  const handleFormSubmit = async (formResult: CreateOrUpdateEventFormState) => {
    if (!loggedInUser) {
      return;
    }

    try {
      const eventId = event
        ? event.eventId
        : Math.floor(Math.random() * 100000 + 999999);

      const getTimeString = (date: moment.Moment) => `${date.format('HH:mm')}:00`;

      let eventPhoto = event ? event.eventPhoto : DEFAULT_IMAGE_URL;
      if (eventImage) {
        const toastId = toast.loading('Uploading File...');

        try {
          const result = await uploadMedia(eventImage, 'photos', false, 'post');

          if (result?.data?.data?.data[0]?.media_file_url) {
            eventPhoto = result?.data?.data?.data[0]?.media_file_url;
          }
          toast.update(toastId, {
            render: 'Image has been uploaded.',
            type: 'success',
            isLoading: false,
          });
        } catch (error) {
          toast.update(toastId, {
            render: 'Unable to upload the image',
            type: 'error',
            isLoading: false,
          });
        }
      }

      const payload: any = {
        eventId,
        eventName: formResult.eventName,
        eventDescription: formResult.eventDescription,
        eventPhoto,
        user: loggedInUser.id,
        venue: userVenues.find((v) => v.venueName === formResult.venueName)?.id ?? null,
        valueName: formResult.venueName,
        network: formResult.network,
        tokenAddress: formResult.tokenAddress,
        eventFequency: formResult.eventFrequency ?? 'Once',
        balanceFrequency: formResult.balanceFrequency,
        eventDateCreated: moment(new Date()).format('MM/DD/YYYY'),
        eventstartTime: getTimeString(formResult.eventStartTime),
        eventEndTime: getTimeString(formResult.eventEndTime),
        eventDate: formResult.eventDate.format('MM/DD/YYYY'),

        tokenName: formResult.tokenName,
        tokenType: formResult.tokenType,
        tokenSymbol: '',
        tokenDecimal: '',
        tokenIcon: '',
      };

      const result = event
        ? await dispatch(updateEvent(event.id as number, payload))
        : await dispatch(createEvent(payload, loggedInUser));
      if (result.success) {
        reset();
        toast.dismiss();
        if (onAfterEventUpdate) onAfterEventUpdate({ ...event, ...payload });
      }
    } catch (error) {
      console.error('Error Occurred in Create event:', error);
    }
  };

  const inputProps = {
    sx: {
      color: toggle ? '#fff' : '#000',
    },
    variant: 'filled' as any,
    fullWidth: true,
  }

  const withBackButton = (children: React.ReactNode) => {
    return (
      <>
        <BackSection
          btnText={createVenueOpened ? 'Back' : 'Back to events'}
          onClick={handleBack}
        />
        {children}
      </>
    );
  };

  if (createVenueOpened) {
    return withBackButton(
      <CreateVenue onClose={() => setCreateVenueOpened(false)} />
    );
  }

  return withBackButton(
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
            name="eventName"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                label="Event Name"
                placeholder="Event name"
              />
            )}
          />
          {formState.errors?.eventName?.type === 'required' && (
            <FormHelperText error>Event name is required</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="venueName"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <FormControl {...inputProps}>
                <InputLabel id="venue-label">Venue</InputLabel>
                <Select {...field} {...inputProps} labelId="venue-label">
                  <MenuItem value="">Select Venue</MenuItem>
                  {userVenues.map((venue) => (
                    <MenuItem
                      key={venue.id}
                      value={venue.venueName}
                    >
                      {venue.venueName}
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem
                    onClick={() => setCreateVenueOpened(true)}
                  >
                    + Add venue
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {formState.errors?.venueName?.type === 'required' && (
            <FormHelperText error>Venue name is required</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="eventDescription"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                label="Event Description"
                placeholder="Tell us a few words about your event."
                multiline
                rows={4}
              />
            )}
          />
          {formState.errors?.eventDescription?.type === 'required' && (
            <FormHelperText error>Event description is required</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="eventDate"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Event Date"
                renderInput={(props) => <TextField {...props} {...field} {...inputProps} />}
              />
            )}
          />
          {formState.errors?.eventDate?.type === 'required' && (
            <FormHelperText error>Event date is required</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="eventFrequency"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <FormControl {...inputProps}>
                <InputLabel id="event-frequency">Frequency</InputLabel>
                <Select {...field} {...inputProps} labelId="event-frequency">
                  <MenuItem value="">Select Frequency</MenuItem>
                  <MenuItem value="Once">Once</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                  <MenuItem value="Year">Year</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {formState.errors?.eventFrequency?.type === 'required' && (
            <FormHelperText error>Event frequency is required</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="eventStartTime"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <TimePicker
                {...field}
                label="Start Time"
                renderInput={(props) => <TextField {...props} {...field} {...inputProps} />}
              />
            )}
          />
          {formState.errors?.eventStartTime?.type === 'required' && (
            <FormHelperText error>Start time is required</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="eventEndTime"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <TimePicker
                {...field}
                label="End Time"
                renderInput={(props) => <TextField {...props} {...field} {...inputProps} />}
              />
            )}
          />
          {formState.errors?.eventEndTime?.type === 'required' && (
            <FormHelperText error>End time is required</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name="balanceFrequency"
            rules={{
              required: true,
              min: 1,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                {...inputProps}
                type="number"
                label="Balance required"
              />
            )}
          />
          {formState.errors?.balanceFrequency && (
            <FormHelperText error>{formState.errors?.balanceFrequency.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6} display="flex" sx={{ gap: 2 }}>
          <TextField
            {...inputProps}
            value={eventImage?.name}
            placeholder="Upload the image..."
            disabled
          />
          <Button
            variant="contained"
            aria-label="upload"
            component="label"
          >
            <input
              hidden
              accept='image/*'
              multiple
              type='file'
              onChange={handleImageUpload}
            />
            Upload
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={8} md={4}>
          <Button variant="contained" type="submit" fullWidth>
            {event ? 'Update event' : 'Create event'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateOrUpdateEvent;
