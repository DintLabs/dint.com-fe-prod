import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';

export const addEvent = async (body: any) => {
  const id = toast.loading('Loading...', {
    autoClose: 6000
  });
  try {
    const result = await _axios.post('api/events/create/', body);
    toast.update(id, {
      render: 'Event created successfully',
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

export const editEvent = async (eventId: number | string | undefined, body: any) => {
  const id = toast.loading('Loading...', {
    autoClose: 6000
  });
  try {
    const result = await _axios.put(`api/events/update/${eventId}/`, body);
    toast.update(id, {
      render: 'Event updated successfully',
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

export const getUserEvents = async (userId: any) => {
  try {
    const result = await _axios.get(`api/events/list_by_user_id/${userId}/`);
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

export const getEvents = async () => {
  try {
    const result = await _axios.get(`api/events/list/`);
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

export const deleteEvent = async (eventId: number): Promise<{ success: boolean }> => {
  try {
    const { data } = await _axios.delete(`api/events/delete/${eventId}/`);
    return { success: +data.code === 200 };
  } catch (e) {
    return { success: false };
  }
};
