import _axios from 'frontend/api/axios';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { toast } from 'react-toastify';
import { uploadMedia } from './mediaService';

interface ResultInterface {
  success: boolean;
  data: UserDataInterface | null;
}

export const updateProfile = () => {};

export const UploadCoverPhoto = async (file: any): Promise<ResultInterface> => {
//  const userHook = useUser();

  const id = toast.loading('Loading...', {
    autoClose: 6000
  });

  const uploadResult = await uploadMedia(file,'photos');

  if (uploadResult.success) {
    try {
      const result = await _axios.put('api/user/update-profile-by-token/', {
        banner_image: uploadResult?.data?.data?.data[0]?.media_file_url || ''
      });

      toast.update(id, {
        render: 'Cover Photo Updated',
        type: 'success',
        isLoading: false
      });

      if (result.data?.data) {
        const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
        localStorage.setItem('userData', JSON.stringify({ ...savedUser, ...result.data.data }));

      }

      return {
        success: true,
        data: result.data.data
      } as ResultInterface;
    } catch (e) {
      toast.update(id, {
        render: 'Something went wrong!',
        type: 'error',
        isLoading: false
      });
      return {
        success: false,
        data: null
      } as ResultInterface;
    }
  } else {
    toast.update(id, {
      render: 'Media Upload Failed!',
      type: 'error',
      isLoading: false
    });
    return {
      success: false,
      data: null
    } as ResultInterface;
  }
};

export const UploadProfilePicture = async (file: any) => {
  const payload = {
    subscription: false,
    folder: 'main-photo/',
    media: ''
  };

  const id = toast.loading('Loading...', {
    autoClose: 6000
  });

  const uploadResult = await uploadMedia(file, 'main-photo', false, '');


  if (uploadResult.success) {
    try {
      const result = await _axios.put('api/user/update-profile-by-token/', {
        profile_image: uploadResult?.data?.data?.data[0]?.media_file_url || ''
      });
      toast.update(id, {
        render: 'Profile Picture Updated',
        type: 'success',
        isLoading: false
      });

      if (result.data?.data) {
        const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
        localStorage.setItem('userData', JSON.stringify({ ...savedUser, ...result.data.data }));
      }

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
  } else {
    toast.update(id, {
      render: 'Media upload failed!',
      type: 'error',
      isLoading: false
    });
  }
};

