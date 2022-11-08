import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';

export const addVenue = async (body: any) => {
  const id = toast.loading('Loading...', {
    autoClose: 6000
  });
  try {
    const result = await _axios.post('api/venue/create/', body);
    toast.update(id, {
      render: 'Venue created successfully',
      type: 'success',
      isLoading: false
    });

    return {
      success: true,
      data: result.data.data
    };
  } catch (e) {
    toast.update(id, {
      render: 'Something went wrong!',
      type: 'error',
      isLoading: false
    });
    return {
      success: false
    };
  }
};

export const editVenue = async (venueId: number | string | undefined, body: any) => {
  const id = toast.loading('Loading...', {
    autoClose: 6000
  });
  try {
    const result = await _axios.put(`api/venue/update/${venueId}/`, body);
    toast.update(id, {
      render: 'Venue updated successfully',
      type: 'success',
      isLoading: false
    });

    return {
      success: true,
      data: result.data.data
    };
  } catch (e) {
    toast.update(id, {
      render: 'Something went wrong!',
      type: 'error',
      isLoading: false
    });
    return {
      success: false
    };
  }
};

export const getUserVenues = async (userId: any) => {
  try {
    const result = await _axios.get(`api/venue/list_by_user_id/${userId}/`);
    return {
      success: true,
      data: result.data.data
    };
  } catch (e) {
    return {
      success: false
    };
  }
};

export const getVenues = async () => {
  try {
    const result = await _axios.get(`api/venue/list/`);
    return {
      success: true,
      data: result.data.data
    };
  } catch (e) {
    return {
      success: false
    };
  }
};
