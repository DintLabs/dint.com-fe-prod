import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { Button, Card, Col } from 'react-bootstrap';

import { RootState, useSelector } from 'frontend/redux/store';
import { IEvent } from 'frontend/types/event';
import { getNetworkByUniqueId } from 'frontend/web3/utils';

const PublicEventList = () => {
  const { lstEvent, isLoading } = useSelector((rootState: RootState) => rootState.event);

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {lstEvent.map((ev: IEvent, index: number) => (
        <Col key={index}>
          <Card>
            <Card.Img variant="top" src={ev.eventPhoto} style={{ height: '200px' }} />
            <Card.Body>
              <Card.Title>
                <b>{ev.eventName}</b>
              </Card.Title>
              <Card.Text>{ev.eventDescription}</Card.Text>
              <hr />
              <h6>Date: {ev.eventDate} </h6>
              <h6>Start Time: {ev.eventstartTime} </h6>
              <h6>End Time: {ev.eventEndTime} </h6>
              <h6>Venue: {ev.venueName} </h6>
              <h6>
                Network: {getNetworkByUniqueId(ev.network as number)?.name}
                <img
                  src={getNetworkByUniqueId(ev?.network as number)?.icon}
                  alt={getNetworkByUniqueId(ev?.network as number)?.SYMBOL}
                  className="network_icon"
                />
              </h6>
              <h6>
                Token Name: {ev.tokenName}{' '}
                <img
                  src={ev.tokenIcon ? ev.tokenIcon : ''}
                  alt=""
                  height="22px"
                  style={{ marginBottom: '2px' }}
                />
              </h6>
              <h6>
                Balance Required: <b> {ev.balanceRequired} </b>{' '}
              </h6>
              <br />

              <Link to="/events">
                <Button>Get Tickets</Button>{' '}
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default PublicEventList;
