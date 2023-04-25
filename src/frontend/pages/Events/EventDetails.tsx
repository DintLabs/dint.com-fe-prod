import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import _axios from 'frontend/api/axios';
import { useNavigate } from 'react-router';
import { IEvent, IVenue } from 'frontend/types/event';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { IconButton, Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { deleteEvent } from 'frontend/redux/slices/event';
import Button from 'frontend/components/common/Button';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import TimerIcon from '@mui/icons-material/Timer';
import PaidIcon from '@mui/icons-material/Paid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackIconButton from '../../components/BackIconButton';

const CARD_BOX_SHADOW = '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)';

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
  const navigate = useNavigate();
  const { toggle } = React.useContext(ThemeContext);
  const [venue, setVenue] = React.useState<IVenue>();
  const mobileView = useMediaQuery('(max-width:899px)');

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

  const startTime = React.useMemo(
    () => moment(event.eventstartTime, 'HH:mm:ss'),
    [event.eventstartTime],
  );

  const endTime = React.useMemo(
    () => moment(event.eventEndTime, 'HH:mm:ss'),
    [event.eventEndTime],
  );

  const handleDelete = (eventId: number) => {
    dispatch(deleteEvent(eventId))
      .then(({ success }) => {
        if (success) {
          onBack();
          toast.success('Event has been deleted.');
        }
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ px: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: mobileView ? '1fr' : 'repeat(2, 1fr)',
              gridTemplateRows: 'auto',
              gridTemplateAreas: mobileView ? `"general" "details" "map"` : `"general general" "details map"`,
            }}
          >
            <Box
              sx={{ gridArea: 'general', position: 'relative' }}
            >
              <Box>
                <BackIconButton onClick={onBack} />
                <Box
                  className="cover-photo-container full-image-container"
                  sx={{
                    backgroundImage: `url(${event.eventPhoto})`,
                    height: '300px',
                    margin: '-8px',
                  }}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ pt: 2, pb: 1 }}
                >
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: 'error.main'
                    }}
                  >
                    {moment(event.eventDate).format('dddd, LL')} at {startTime.format('LT')} - {endTime.format('LT')}
                  </Typography>

                  <Typography variant="h2" sx={{ color: toggle ? '#fff' : '#000' }}>
                    {event.eventName}
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}>
                    {event.valueName}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{ gap: 1, pt: 1 }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Button
                        label="Create ticket"
                        onClick={() => {
                          onGetTicket(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {isOwner && (
                        <Button
                          label="Edit"
                          onClick={() => {
                            onEventEdit(event);
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      {isOwner && (
                        <Button
                          label="Delete"
                          onClick={() => {
                            handleDelete(event.id as number);
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ gridArea: 'details' }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  boxShadow: CARD_BOX_SHADOW,
                  gap: 2,
                }}
              >
                <Typography variant="h3" sx={{ color: toggle ? '#fff' : '#000' }}>
                  Details
                </Typography>
                <Typography
                  sx={{
                    lineHeight: '28px',
                    verticalAlign: 'middle',
                    color: toggle ? '#fff' : '#000',
                  }}
                >
                  <PersonIcon
                    sx={{
                      fontSize: '16px',
                      color: 'secondary.light',
                      mr: 1,
                    }}
                  /> Event by <b style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate(`/${event.user.custom_username}`)}>{event.user.display_name}</b>
                </Typography>

                <Typography
                  sx={{
                    lineHeight: '28px',
                    verticalAlign: 'middle',
                    color: toggle ? '#fff' : '#000',
                  }}
                >
                  <PlaceIcon
                    sx={{
                      fontSize: '16px',
                      color: 'secondary.light',
                      mr: 1,
                    }}
                  /> <b>{venue?.venueAddress ?? event.valueName}</b>
                </Typography>

                <Typography
                  sx={{
                    lineHeight: '28px',
                    verticalAlign: 'middle',
                    color: toggle ? '#fff' : '#000',
                  }}
                >
                  <TimerIcon
                    sx={{
                      fontSize: '16px',
                      color: 'secondary.light',
                      mr: 1,
                    }}
                  /> Duration: {moment.utc(endTime.diff(startTime)).format('h:mm [hr]')}
                </Typography>

                <Typography
                  sx={{
                    lineHeight: '28px',
                    verticalAlign: 'middle',
                    color: toggle ? '#fff' : '#000',
                  }}
                >
                  <PaidIcon
                    sx={{
                      fontSize: '16px',
                      color: 'secondary.light',
                      mr: 1,
                    }}
                  /> Balance required: <b>{event.balanceFrequency} {event.tokenName}</b>
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ gridArea: 'map' }}
            >
              {venue && venue.venueAddress && (
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    boxShadow: CARD_BOX_SHADOW,
                  }}
                >
                  <iframe
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${venue.venueAddress.replace(/\s/g, '+')}`}
                  >
                  </iframe>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default EventDetails;
