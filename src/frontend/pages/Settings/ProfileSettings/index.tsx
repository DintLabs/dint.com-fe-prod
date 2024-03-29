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
import {dispatch, RootState} from 'frontend/redux/store';
import { UploadProfilePicture } from 'frontend/services/profileService';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiCloudUpload } from 'react-icons/bi';
import { BsDiscord, BsInstagram, BsTwitter } from 'react-icons/bs';

import { toast } from 'react-toastify';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useNavigate } from 'react-router';
import {useSelector} from 'react-redux';

const TWITTER_PROFILE_URL = 'https://twitter.com/';
const INSTAGRAM_PROFILE_URL = 'https://instagram.com/';
const DISCORD_PROFILE_URL = 'https://discordapp.com/users/';

const ProfileSettings = () => {
  const theme = useTheme();
  const userHook = useUser();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const user = useSelector((state: RootState) => state.user.userData);

  const { handleSubmit, formState, watch, control, setValue } = useForm();
  const { toggle } = useContext(ThemeContext);

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

  useEffect(() => {
    if (user) {
      setValue('custom_username', user.custom_username);
      setValue('display_name', user.display_name);
      setValue('bio', user.bio);
      setValue('city', user.city);
      setValue('twitter', user.twitter?.replace(TWITTER_PROFILE_URL, ''));
      setValue('instagram', user.instagram?.replace(INSTAGRAM_PROFILE_URL, ''));
      setValue('discord', user.discord?.replace(DISCORD_PROFILE_URL, ''));
    }
  }, [user]);

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

    const dataWithSocials = {
      ...data,
      twitter: data.twitter ? TWITTER_PROFILE_URL + data.twitter : '',
      instagram: data.instagram ? INSTAGRAM_PROFILE_URL + data.instagram : '',
      discord: data.discord ? DISCORD_PROFILE_URL + data.discord : '',
    };

    try {
      const { data } = await _axios.put('api/user/update-profile-by-token/', dataWithSocials);
      const { data: userData } = data;

      if (userData) {
        userHook.setCurrentUser({ ...userHook.reduxUser, ...userData });

        setValue('custom_username', userData.custom_username);
        setValue('display_name', userData.display_name);
        setValue('bio', userData.bio);
        setValue('city', userData.city);
        setValue('twitter', userData.twitter?.replace(TWITTER_PROFILE_URL, ''));
        setValue('instagram', userData.instagram?.replace(INSTAGRAM_PROFILE_URL, ''));
        setValue('discord', userData.discord?.replace(DISCORD_PROFILE_URL, ''));

        setTimeout(() => {
          toast.update(id, {
            render: 'Profile Updated Successful!',
            type: 'success',
            isLoading: false
          });
        }, 1000);

        setTimeout(() => {
          toast.dismiss();
          navigate(`/${userData.custom_username}`);
        }, 2000);
      }
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

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box sx={{ position: 'relative', top: 5, left: 20 }}>
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
              accept="image/*,.jpg, .jpeg, .png"
              type="file"
              onChange={handleProPicChange}
            />
            <BiCloudUpload />
          </MUIButton>
        </Box>

        <MUIButton variant="contained" component="label">
          <input hidden accept="image/*,.jpg, .jpeg, .png" type="file" onChange={handleProPicChange} />
          Upload avatar
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
              defaultValue={user?.twitter?.replace(TWITTER_PROFILE_URL, '') || ''}
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
                        <BsTwitter />
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
              defaultValue={user?.instagram?.replace(INSTAGRAM_PROFILE_URL, '') || ''}
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
              defaultValue={user?.discord?.replace(DISCORD_PROFILE_URL, '') || ''}
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

