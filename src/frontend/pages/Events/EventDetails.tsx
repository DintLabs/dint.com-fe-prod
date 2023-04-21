import React from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import _axios from 'frontend/api/axios';
import { IEvent, IVenue } from 'frontend/types/event';
import { Button, Grid, Link, Typography } from '@mui/material';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { deleteEvent } from 'frontend/redux/slices/event';
import BackSection from './BackSection';

type EventDetailsProps = {
  event: IEvent;
  onBack: () => void;
  onGetTicket: (event: IEvent) => void;
  onEventEdit: (event: IEvent) => void;
};

type GetVenueResponse = {
  code: number;
  data: IVenue;
  message: string;
};

function EventDetails({
  event,
  onBack,
  onGetTicket,
  onEventEdit,
}: EventDetailsProps) {
  const { toggle } = React.useContext(ThemeContext);
  const [venue, setVenue] = React.useState<IVenue>();

  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);

  React.useEffect(() => {
    if (!event.venue) return;
    _axios.get(`api/venue/get/${event.venue}/`)
      .then(({ data }: AxiosResponse<GetVenueResponse>) => {
        if (data.code === 200) {
          setVenue(data.data);
        }
      });
  }, []);

  const isOwner = React.useMemo(() => {
    if (!loggedInUser || !event.user) return false;
    return loggedInUser.id === event.user.id;
  }, [event.user, loggedInUser]);

  const handleDelete = (eventId: number) => {
    dispatch(deleteEvent(eventId))
      .then(({ success }) => {
        if (success) {
          toast.success('Event has been deleted.');
        }
      });
  };

  return (
    <>
      <BackSection btnText="Back" onClick={onBack} />
      <Grid
        container
        spacing={1}
        sx={{
          color: toggle ? '#fff' : '#000',
          px: 1,
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <img
            src={event.eventPhoto}
            alt="event_photo"
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h2">
            {event.eventName}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>
            <b>Date:</b> {event.eventDate}
          </Typography>
          <Typography>
            <b>Start time:</b> {event.eventstartTime}
          </Typography>
          <Typography>
            <b>End time:</b> {event.eventEndTime}
          </Typography>
        </Grid>

        {!venue && event.valueName && (
          <Grid item xs={12} sm={6} md={4}>
            <Typography>
              <b>Venue:</b> {event.valueName}
            </Typography>
          </Grid>
        )}

        {venue && (
          <Grid item xs={12} sm={6} md={4}>
            <Typography>
              <b>Venue:</b> {venue.venueName}
            </Typography>
            <Typography>
              <b>Address:</b> {venue.venueAddress}
            </Typography>
            {venue.venueGmap && (
              <Link
                onClick={() => {
                  window.open(venue?.venueGmap, '_blank');
                }}
              >
                Link to Google Maps
              </Link>
            )}
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={4}>
          <Typography>
            <b>Balance required:</b> {event.balanceFrequency}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4} display="flex" sx={{ gap: 1 }}>
          <Button
            variant="contained"
            onClick={() => {
              onGetTicket(event);
            }}
          >
            Get Ticket
          </Button>
          {isOwner && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  onEventEdit(event);
                }}
              >
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  handleDelete(event.id as number);
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default EventDetails;
