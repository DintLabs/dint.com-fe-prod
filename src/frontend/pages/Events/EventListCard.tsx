import React from 'react';
import { IEvent } from 'frontend/types/event';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
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

type EventListCardProps = {
  event: IEvent,
  onEventDetails: (event: IEvent) => void;
  onGetTicket: (event: IEvent) => void;
}

const EventListCard = ({
  event,
  onEventDetails,
  onGetTicket,
}: EventListCardProps) => {
  const { toggle } = React.useContext(ThemeContext);
  const [details, setDetails] = React.useState<React.ReactNode[]>([]);

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
              onEventDetails(event)
            }}
          >
            Show details
          </Button>
          <Button
              variant="contained"
              onClick={() => {
                onGetTicket(event);
              }}
          >
            Get Ticket
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EventListCard;
