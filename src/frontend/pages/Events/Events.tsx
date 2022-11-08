import { fetchEvents } from 'frontend/redux/slices/event';
import { dispatch } from 'frontend/redux/store';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import '../../material/Event.css';
import EventList from './EventList';

const Events = () => {
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta
          name="description"
          content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
        />
      </Helmet>
      <div id="events">
        <div className="container" style={{ marginTop: '40px' }}>
          <div className="header">
            <h1>Events</h1>
          </div>
        </div>

        <div className="container">
          <FlexRow minH="100vh" h="100%">
            <EventList />
          </FlexRow>
        </div>
      </div>
    </>
  );
};

export default Events;
