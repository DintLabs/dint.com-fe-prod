import { RootState, useSelector } from 'frontend/redux/store';
import { Table } from 'react-bootstrap';
import '../../material/admin.css';

const VenueList = () => {
  const { userVenues } = useSelector((rootState: RootState) => rootState.event);
  return (
    <>
      <Table striped bordered hover className="dark-mode">
        <thead>
          <tr>
            <th>#</th>
            <th> Venue Name</th>
            <th> Venue Address</th>
            <th> Google Map</th>
          </tr>
        </thead>
        <tbody>
          {userVenues.map((item: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.venueName}</td>
              <td>{item.venueAddress}</td>
              <td>{item.venueGmap}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default VenueList;
