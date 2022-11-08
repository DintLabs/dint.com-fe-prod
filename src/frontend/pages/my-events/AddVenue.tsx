import { FormHelperText } from '@mui/material';
import { fetchUserVenues } from 'frontend/redux/slices/event';
import { dispatch } from 'frontend/redux/store';
import { addVenue } from 'frontend/services/venueService';

import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import '../../material/admin.css';

const AddVenue = () => {
  const { handleSubmit, formState, control, reset } = useForm();

  // const [objVenue, setObjVenue] = useState<IVenue>({} as IVenue);

  const createVanue = async (data: any) => {
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    data.user = user?.id;
    data.venuedataCreated = `${mm}/${dd}/${yyyy}`;
    const result = await addVenue(data);
    if (result.success) {
      reset();
      dispatch(fetchUserVenues(user?.id));
    }
    toast.dismiss();
  };

  return (
    <form onSubmit={handleSubmit(createVanue)}>
      <h1>Add Venue</h1>
      <Form.Group className="mb-3">
        <Form.Label>Venue Name</Form.Label>
        <Controller
          control={control}
          name="venueName"
          rules={{
            required: true
          }}
          // defaultValue={selectedEvent?.eventName || ''}
          render={({ field: { onChange, value = '', ref } }) => (
            <Form.Control
              ref={ref}
              type="text"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              placeholder="Venue Name Here"
            />
          )}
        />
        {formState.errors?.venueName?.type === 'required' && (
          <FormHelperText error={true}>Venue name is required</FormHelperText>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Controller
          control={control}
          name="venueAddress"
          rules={{
            required: true
          }}
          // defaultValue={selectedEvent?.eventName || ''}
          render={({ field: { onChange, value = '', ref } }) => (
            <Form.Control
              ref={ref}
              type="text"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              placeholder="Address Here"
            />
          )}
        />
        {formState.errors?.venueAddress?.type === 'required' && (
          <FormHelperText error={true}>Venue address is required</FormHelperText>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address Link (Optional)</Form.Label>
        <Controller
          control={control}
          name="venueGmap"
          rules={{
            required: true
          }}
          // defaultValue={selectedEvent?.eventName || ''}
          render={({ field: { onChange, value = '', ref } }) => (
            <Form.Control
              ref={ref}
              type="text"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              placeholder="Add Google map Link Here"
            />
          )}
        />
        {formState.errors?.venueGmap?.type === 'required' && (
          <FormHelperText error={true}>Google map link is required</FormHelperText>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
export default AddVenue;
