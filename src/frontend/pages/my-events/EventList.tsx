import AddEditEventComponent from 'frontend/components/events/add-edit-event-component';
import { fetchUserEvents } from 'frontend/redux/slices/event';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { IEvent } from 'frontend/types/event';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import polygonlogo from '../../material/polygon_logo.svg';
import solanalogo from '../../material/solana_logo.svg';

const DisplaynetworkLogo = (props: { networkName: any }) => {
  if (props.networkName === 'Polygon') {
    return <img src={polygonlogo} alt="" height="17px" style={{ marginBottom: '2px' }} />;
  }
  if (props.networkName === 'Solana') {
    return <img src={solanalogo} alt="" height="17px" style={{ marginBottom: '2px' }} />;
  }
  return <p>token</p>;
};

const AdminEventList = () => {
  const [isEditModal, setEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const { userEvents } = useSelector((rootState: RootState) => rootState.event);

  const onEditComplete = () => {
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    setEditModal(false);
    setSelectedEvent(null);
    dispatch(fetchUserEvents(user?.id));
  };
  return (
    <div className="wallet_info_div dark-mode">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th> Venue</th>
            <th> Description</th>
            <th> Date</th>
            <th> Start Time </th>
            <th> End Time</th>
            <th> Created At</th>
            <th> Balance Required</th>
            <th> Image</th>
            <th> Edit </th>
          </tr>
        </thead>
        <tbody id="eventtable_body">
          {userEvents.map((objEvent: IEvent, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td> {objEvent.eventName}</td>
              <td> {objEvent.venueName}</td>
              <td> {objEvent.eventDescription}</td>
              <td> {objEvent.eventDate}</td>
              <td> {objEvent.eventstartTime}</td>
              <td> {objEvent.eventEndTime}</td>
              <td> {objEvent.eventDateCreated}</td>
              <td>
                {objEvent.balanceRequired}&nbsp;{objEvent.tokenName}{' '}
                <DisplaynetworkLogo networkName={objEvent.network} />
              </td>
              <td>
                <img
                  src={objEvent.eventPhoto}
                  style={{ height: '80px', width: '80px' }}
                  alt="eventPhoto"
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedEvent(objEvent);
                    setEditModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal size="lg" show={isEditModal} onHide={() => setEditModal(!isEditModal)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEditEventComponent selectedEvent={selectedEvent} callback={onEditComplete} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default AdminEventList;
