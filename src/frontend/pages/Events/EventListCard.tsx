import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { IEvent } from 'frontend/types/event';
import * as Alert from 'frontend/components/common/alert';
import { deleteEvent } from 'frontend/redux/slices/event';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { RootState, useSelector, dispatch } from 'frontend/redux/store';
import POLYGON_ICON from 'frontend/assets/img/web3/matic-token.png';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import '../../material/Event.css';

type EventListCardProps = {
  event: IEvent,
  onEventEdit: (event: IEvent) => void;
}

const EventListCard = ({ event, onEventEdit }: EventListCardProps) => {
  const navigate = useNavigate();
  const { toggle } = React.useContext(ThemeContext);
  const { balance } = useSelector((rootState: RootState) => rootState.walletState);
  const loggedInUser = useSelector((rootState: RootState) => rootState.user.userData);

  const [details, setDetails] = React.useState<React.ReactNode[]>([]);

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

  React.useEffect(() => {
    if (event) {
      setDetails([
        `Date: ${event.eventDate}`,
        `Start Time: ${event.eventstartTime}`,
        `End Time: ${event.eventEndTime}`,
        `Venue: ${event.venueName || event.valueName}`,
        <>{'Network: '}<img src={POLYGON_ICON} alt="polygon" height={20} /></>,
        `Token Name: ${event.tokenName}`,
        <>{'Balance Required: '}<b>{event.balanceFrequency}</b></>
      ]);
    }
  }, [event]);

  return (
    <Grid item xs={12} sm={6} md={4} sx={{p: 1}}>
      <Card
        sx={{
          backgroundColor: toggle ? '#212B36' : '#fff',
          color: toggle ? '#fff' : '#000',
        }}
      >
        <CardMedia image={event.eventPhoto} sx={{ height: '200px' }} />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {event.eventName}
          </Typography>
          <Divider />

          {details.map((detail, i) => (
            <Typography key={`${event.eventId}_${i}`} variant="h5" sx={{ mt: 1 }}>
              {detail}
            </Typography>
          ))}
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button
              variant="contained"
              onClick={() => {
                generateQrCode(event);
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
                  handleDelete(event.id as number)
                }}
              >
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EventListCard;
