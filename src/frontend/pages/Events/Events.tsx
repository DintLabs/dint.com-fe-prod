import React from 'react';
import { Helmet } from 'react-helmet';
import { IEvent } from 'frontend/types/event';
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { fetchEvents, fetchUserVenues } from 'frontend/redux/slices/event';
import CreateOrUpdateEvent from './CreateOrUpdateEvent';
import EventList from './EventList';
import '../../material/Event.css';

const Events = () => {
  const theme = useTheme();
  const { toggle } = React.useContext(ThemeContext);
  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);

  const [selectedEvent, setSelectedEvent] = React.useState<IEvent>();
  const [isInEditMode, setIsInEditMode] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  React.useEffect(() => {
    if (loggedInUser?.id) {
      dispatch(fetchUserVenues(loggedInUser.id));
    }
  }, [loggedInUser?.id]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [isInEditMode]);

  const handleEventEditClick = (event: IEvent) => {
    setSelectedEvent(event);
    setIsInEditMode(true);
  };

  const disableEditMode = () => {
    setIsInEditMode(false);
    setSelectedEvent(undefined);
  };

  const handleEventUpdate = () => {
    disableEditMode();
  };

  return (
    <>
      <Helmet>
        <title>{'Events'}</title>
        <meta
          name="description"
          content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
        />
      </Helmet>
      <Box id="events" position="relative" minHeight="100vh">
        <Box style={{ paddingTop: '15px' }}>
          <div className="header">
            <h1>Events</h1>
          </div>
        </Box>

        <Grid container sx={{ pt: 2, pb: 9 }}>
          {isInEditMode ? (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                sx={{
                  width: '100%',
                  height: '60px',
                  color: toggle ? '#fff' : '#000',
                  px: 1,
                }}

              >
                <Button
                  variant="contained"
                  onClick={disableEditMode}
                  startIcon={<ArrowLeftIcon />}
                >
                  Back to events
                </Button>
              </Box>
              <CreateOrUpdateEvent
                event={selectedEvent}
                onEventUpdate={handleEventUpdate}
              />
            </>
          ) : (
            <EventList onEventEdit={handleEventEditClick} />
          )}
        </Grid>

        {!isInEditMode && (
          <IconButton
            sx={{
              backgroundColor: theme.palette.primary.main,
              position: 'sticky',
              bottom: '100px',
              left: '85vw',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
            onClick={() => {
              setIsInEditMode(true);
            }}
          >
            <AddIcon sx={{ color: '#fff' }} />
          </IconButton>
        )}
      </Box>
    </>
  );
};

export default Events;
