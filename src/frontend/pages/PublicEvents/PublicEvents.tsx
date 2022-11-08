import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import { fetchEvents } from 'frontend/redux/slices/event';
import { AppDispatch } from 'frontend/redux/store';
import { FlexRow } from 'frontend/reusable/reusableStyled';

import PublicEventList from './PublicEventList';

const PublicEvents = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
            <PublicEventList />
          </FlexRow>
        </div>
      </div>
    </>
  );
};
export default PublicEvents;
