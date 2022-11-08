import { IEvent } from 'frontend/types/event';
import { useMemo } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import '../../material/Event.css';
import { getNetworkByUniqueId } from '../../web3/utils';

const EventListCard = ({
  objEvent,
  getMetamaskBalance
}: {
  objEvent: IEvent;
  getMetamaskBalance: (selectedEvent: IEvent) => void;
}) => {
  const networkData = useMemo(() => {
    try {
      if (objEvent?.network) {
        // const n = parseInt(objEvent?.network.toString(), 10);
        return getNetworkByUniqueId(objEvent.network);
      }
    } catch (e) {
      return null;
    }
  }, [objEvent]);

  return (
    <Col md={4}>
      <Card style={{ margin: 4 }}>
        <Card.Img variant="top" src={objEvent.eventPhoto} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>
            <b>{objEvent.eventName}</b>
          </Card.Title>
          <Card.Text>{objEvent.eventDescription}</Card.Text>
          <hr />
          <h6>Date: {objEvent.eventDate} </h6>
          <h6>Start Time: {objEvent.eventstartTime} </h6>
          <h6>End Time: {objEvent.eventEndTime} </h6>
          <h6>Venue: {objEvent.venueName || objEvent.valueName} </h6>
          <h6>
            Network: {networkData?.name}
            {networkData?.icon && (
              <img
                style={{ width: 44, height: 44 }}
                src={networkData?.icon}
                alt={networkData?.SYMBOL}
                className="network_icon"
              />
            )}
          </h6>
          <h6>
            Token Name: {objEvent.tokenName}
            {objEvent.tokenIcon && (
              <img
                src={objEvent.tokenIcon ? objEvent.tokenIcon : ''}
                alt=""
                height="22px"
                style={{ marginBottom: '2px', height: 44, width: 44 }}
              />
            )}
          </h6>
          <h6>
            Balance Required: <b> {objEvent.balanceFrequency} </b>
          </h6>
          <br />
          <Button
            variant="primary"
            onClick={() => {
              getMetamaskBalance(objEvent);
            }}
          >
            More Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventListCard;
