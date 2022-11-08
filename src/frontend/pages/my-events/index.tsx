import AddEditEventComponent from 'frontend/components/events/add-edit-event-component';

import { fetchUserEvents, fetchUserVenues } from 'frontend/redux/slices/event';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import '../../material/admin.css';

import AddVenue from './AddVenue';
import EventList from './EventList';
import VenueList from './VenueList';

const MyEventsContainer = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (user instanceof Object) {
      dispatch(fetchUserEvents(user.id));
      dispatch(fetchUserVenues(user.id));
    }
  }, [user, user?.id]);

  return (
    <>
      <div id="admin_form_parent">
        <div id="admin_form_child">
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h1>Event Management</h1>
          </div>

          <Tabs
            defaultActiveKey="eventshow"
            id="uncontrolled-tab-example"
            className="mb-3 dark-mode"
          >
            <Tab eventKey="eventshow" title="Event List">
              <EventList />
            </Tab>

            <Tab eventKey="eventadd" title="Add Event" className="dark-mode">
              <AddEditEventComponent selectedEvent={null} callback={null} />
            </Tab>
            <Tab eventKey="vanueadd" title="Add Venue" className="dark-mode">
              <AddVenue />
            </Tab>
            <Tab eventKey="vanueshow" title="Venue List" className="dark-mode">
              <VenueList />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default MyEventsContainer;
