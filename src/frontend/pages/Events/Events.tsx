import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { IEvent } from 'frontend/types/event';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, IconButton, useTheme } from '@mui/material';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { fetchEvents, fetchUserVenues } from 'frontend/redux/slices/event';
import { getWalletBalance } from 'frontend/redux/slices/wallet';
import * as Alert from 'frontend/components/common/alert';
import CreateOrUpdateEvent from './CreateOrUpdateEvent';
import EventList from './EventList';
import EventDetails from './EventDetails';

type DisplayMode = 'default' | 'details' | 'edit';

const Events = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { balance } = useSelector((rootState: RootState) => rootState.walletState);
  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);
  const eventsLoading = useSelector((rootState: RootState) => rootState.event.isLoading);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = React.useState<IEvent>();
  const [displayMode, setDisplayMode] = React.useState<DisplayMode>('default');

  React.useEffect(() => {
    const tasks: Promise<any>[] = [dispatch(fetchEvents())];
    if (!balance) {
      tasks.push(dispatch(getWalletBalance()));
    }

    Promise.all(tasks).then(() => setIsLoading(false));
  }, [balance]);

  React.useEffect(() => {
    if (loggedInUser?.id) {
      dispatch(fetchUserVenues(loggedInUser.id));
    }
  }, [loggedInUser?.id]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [displayMode]);

  const enableEditMode = (event: IEvent) => {
    setSelectedEvent(event);
    setDisplayMode('edit');
  };

  const backToDefaultMode = () => {
    setDisplayMode('default');
    setSelectedEvent(undefined);
  };

  const generateQrCode = (event: IEvent) => {
    if (balance < +(event.balanceFrequency ?? 1)) {
      const config = Alert.configWarnAlert({
        title: 'Balance not sufficient',
        text: `Your balance: ${balance}`,
      });
      Alert.alert(config);
      return;
    }

    navigate(
      '/lounge/events/ticket',
      {
        state: {
          userId: loggedInUser?.id ?? '',
          eventId: event.eventId,
        }
      }
    );
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
          {displayMode === 'default' && (
            <EventList
              isLoading={isLoading || eventsLoading}
              onGetTicket={generateQrCode}
              onEventDetails={(event) => {
                setSelectedEvent(event);
                setDisplayMode('details');
              }}
            />
          )}

          {displayMode === 'edit' && (
            <CreateOrUpdateEvent
              event={selectedEvent}
              onBack={backToDefaultMode}
              onAfterEventUpdate={backToDefaultMode}
            />
          )}

          {displayMode === 'details' && selectedEvent && (
            <EventDetails
              event={selectedEvent}
              onBack={backToDefaultMode}
              onEventEdit={enableEditMode}
              onGetTicket={generateQrCode}
            />
          )}
        </Grid>

        {displayMode === 'default' && (
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
              setDisplayMode('edit');
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
