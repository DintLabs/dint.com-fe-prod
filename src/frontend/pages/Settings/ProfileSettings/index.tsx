import {
  Avatar,
  Badge,
  Box,
  Button as MUIButton,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import _axios from 'frontend/api/axios';
import BackBlock from 'frontend/components/submenu/sections/BackBlock';
import UsernameInput from 'frontend/components/username/UsernameInput';
import useUser from 'frontend/hooks/useUser';
import { fetchUserData } from 'frontend/redux/slices/user';
import { dispatch } from 'frontend/redux/store';
import { UploadCoverPhoto, UploadProfilePicture } from 'frontend/services/profileService';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiCloudUpload } from 'react-icons/bi';
import { BsDiscord, BsInstagram, BsTwitch } from 'react-icons/bs';

import { toast } from 'react-toastify';
import { ThemeContext } from '../../../contexts/ThemeContext';

const ProfileSettings = () => {
  const theme = useTheme();
  const userHook = useUser();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { handleSubmit, formState, watch, control, setValue } = useForm();
  const { toggle } = useContext(ThemeContext);

  const user = userHook.reduxUser;
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData') ?? '{}'));
  const [isUniqueUsername, setIsUniqueUsername] = useState(true);

  const fetchUserDataFn = async () => {
    // const { data } = await _axios.get('/api/user/get-profile-by-token/');
    // setUser(data.data);

    dispatch(fetchUserData());
  };

  useEffect(() => {
    fetchUserDataFn();
  }, []);

  const handleCoverPhotoChange =  (e: any) => {
    if (e.target.files && e.target.files.length) {
      UploadCoverPhoto(e.target.files[0]).then(result => {
        if (result?.success && user) {
          userHook.setCurrentUser({ ...user, banner_image: result?.data?.banner_image || '' });
          // setUser({ ...user, banner_image: result?.data?.banner_image || '' });
        }
      })
      toast.dismiss();
    }
  };

  const handleProPicChange = (e: any) => {
    if (e.target.files && e.target.files.length) {
      UploadProfilePicture(e.target.files[0]).then(result => {
        if (result?.success && user) {
          // Update the user object with the new profile image
          userHook.setCurrentUser({ ...user, profile_image: result?.data?.profile_image || '' });
          // Set the image URL to display the uploaded profile image
          setImage(URL.createObjectURL(e.target.files[0]));
        }
      });
      toast.dismiss();
    }
  };
  

  const onSubmit = async (data: any) => {
    const id = toast.loading('Loading...');

    try {
      const result = await _axios.put('api/user/update-profile-by-token/', data);

      if (result.data.data) {
        // const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
        // localStorage.setItem('userData', JSON.stringify({ ...savedUser, ...result.data.data }));

        userHook.setCurrentUser({ ...userHook.reduxUser, ...result.data.data });

        setValue('custom_username', result?.data?.data?.custom_username);
        setValue('display_name', result?.data?.data?.display_name);
        setValue('bio', result?.data?.data?.bio);
        setValue('city', result?.data?.data?.city);
        setValue('twitter', result?.data?.data?.twitter);
        setValue('instagram', result?.data?.data?.instagram);
        setValue('discord', result?.data?.data?.discord);
      }
      setTimeout(() => {
        toast.update(id, {
          render: 'Profile Updated Successful!',
          type: 'success',
          isLoading: false
        });
      }, 1000);

      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message);
    }
  };

  const displayName = watch('display_name');
  const bio = watch('bio');
  const city = watch('city');
  const twitter = watch('twitter');
  const instagram = watch('instagram');
  const discord = watch('discord');
  const amazonWishlist = watch('amazon_wishlist');

  return (
    <div>
      <BackBlock title="Profile Settings" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          width: '100%',
          height: 250,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${user?.banner_image || ''})`
        }}
      >
        <MUIButton variant="contained" component="label" sx={{ m: 1 }}>
          <input hidden accept="image/*,.jpg, .jpeg, .png" type="file" onChange={handleCoverPhotoChange} />
          Upload cover photo
        </MUIButton>
      </div>
      <Box sx={{ position: 'relative', bottom: 15, left: 20, right: 30 }}>
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          color="success"
          overlap="circular"
          badgeContent=" "
          variant="dot"
        >
          <Avatar src={user?.profile_image} sx={{ width: 75, height: 75 }} />
        </Badge>
        <MUIButton
          style={{
            maxWidth: '20px',
            maxHeight: '20px',
            minWidth: '20px',
            minHeight: '20px',
            padding: 0,
            borderRadius: 10
          }}
          size="small"
          variant="contained"
          component="label"
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 10
          }}
        >
          <input
            hidden
            accept="video/*,image/*"
            multiple
            type="file"
            onChange={handleProPicChange}
          />
          <BiCloudUpload />
        </MUIButton>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={2} ml={isLargeScreen ? 3 : 0}>
          <UsernameInput
            setIsUniqueUsername={setIsUniqueUsername}
            isUniqueUsername={isUniqueUsername}
            formState={formState}
            control={control}
            watch={watch}
          />

          <FormControl fullWidth>
            <Controller
              control={control}
              name="display_name"
              rules={{
                required: true,
                maxLength: 100
              }}
              defaultValue={user?.display_name || ''}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={
                    formState.errors?.display_name?.type === 'required' ||
                    formState.errors?.display_name?.type === 'maxLength'
                  }
                  inputRef={ref}
                  value={value}
                  label="Display Name"
                  variant="filled"
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${displayName?.length || 0}/100`}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="bio"
              rules={{
                required: true,
                maxLength: 1000
              }}
              defaultValue={user?.bio || ''}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={
                    formState.errors?.bio?.type === 'required' ||
                    formState.errors?.bio?.type === 'maxLength'
                  }
                  inputRef={ref}
                  value={value}
                  label="Bio"
                  variant="filled"
                  onChange={(e: any) => onChange(e.target.value)}
                  multiline
                  rows={4}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${bio?.length || 0}/1000`}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="city"
              rules={{
                required: true,
                maxLength: 100
              }}
              defaultValue={user?.city || ''}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={
                    formState.errors?.city?.type === 'required' ||
                    formState.errors?.city?.type === 'maxLength'
                  }
                  inputRef={ref}
                  value={value}
                  label="City"
                  variant="filled"
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${city?.length || 0}/1000`}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="twitter"
              defaultValue={user?.twitter || ''}
              rules={{
                maxLength: 100
              }}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={formState.errors?.twitter?.type === 'maxLength'}
                  inputRef={ref}
                  value={value}
                  label="Twitter"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsTwitch />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${twitter?.length || 0}/100`}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="instagram"
              defaultValue={user?.instagram || ''}
              rules={{
                maxLength: 100
              }}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={formState.errors?.instagram?.type === 'maxLength'}
                  inputRef={ref}
                  value={value}
                  label="Instagram"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsInstagram />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${instagram?.length || 0}/100`}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="discord"
              defaultValue={user?.discord || ''}
              rules={{
                maxLength: 100
              }}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={formState.errors?.discord?.type === 'maxLength'}
                  inputRef={ref}
                  value={value}
                  label="Discord"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsDiscord />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${discord?.length || 0}/100`}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="amazon_wishlist"
              defaultValue={user?.amazon_wishlist || ''}
              rules={{
                maxLength: 100
              }}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  error={formState.errors?.amazon_wishlist?.type === 'maxLength'}
                  inputRef={ref}
                  value={value}
                  label="Amazon Wishlist"
                  variant="filled"
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      textAlign: 'right'
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  helperText={`${amazonWishlist?.length || 0}/100`}
                />
              )}
            />
          </FormControl>
          <button
            className="btn btn-primary"
            style={{ background: '#7635dc', marginBottom: 100, outline: 'unset', borderWidth: 0 }}
            type="submit"
          >
            Submit
          </button>
        </Stack>
      </form>
    </div>
  );
};

export default ProfileSettings;
function setImage(arg0: string) {
  throw new Error('Function not implemented.');
}

