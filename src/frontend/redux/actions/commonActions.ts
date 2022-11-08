import FormData from 'form-data';
import axios from '../../api/axios';
import { AppDispatch } from '../store';

export const uploadMedia = (file: any, folderName: string) => async (dispatch: AppDispatch) => {
  const formData = new FormData();
  formData.append('media', file);
  if(file.type.includes('video')) {
    formData.append('folder', 'videos');
  } else {
    formData.append('folder', folderName);
  }

  try {
    return axios.post('api/upload/media/', formData).then((res: any) => {
      if (res.status === 200) {
        return res.data.data[0].media_file_url;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

export const checkUsernameAvailability = (username: string) => async (dispatch: AppDispatch) => {
  return axios
    .get(`api/page/check-user-name-availability/${username}/`)
    .then((res: any) => {
      if (res.status === 200 && res?.data?.code === 200) {
        return res?.data?.data;
      }
      return null;
    })
    .catch((error: any) => {
      console.error(error);
    });
};
