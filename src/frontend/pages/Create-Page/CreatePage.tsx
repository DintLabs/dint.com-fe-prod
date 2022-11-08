import React, { useContext, useEffect, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Stack } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { HiInformationCircle } from 'react-icons/hi';
import CoverProfileDropzone from 'frontend/components/create-page/CoverProfileDropzone';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { uploadMedia } from 'frontend/redux/actions/commonActions';
import { RootState, useDispatch } from 'frontend/redux/store';
import TogglingText from 'frontend/components/common/TogglingText';

import { createPage, updatePage } from 'frontend/redux/slices/page';
import { useSelector } from 'react-redux';
import { categoriesConfigObject } from '../../utils/index';
import coverPhoto from '../../material/images/create-page-cover-photo.png';
import { ThemeContext } from '../../contexts/ThemeContext';

// const dummyDescription =
//   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const CreatePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const pageData = useSelector((state: RootState) => state?.page?.pageData);
  const [isPageCreated, setIsPageCreated] = useState(false);
  const [uploadedProfilePicture, setUploadedProfilePicture] = useState<any>([]);
  const [uploadedProfilePictureUrl, setUploadedProfilePictureUrl] = useState<any>();
  const [uploadedCoverPicture, setUploadedCoverPicture] = useState<any>([]);
  const [uploadedCoverPictureUrl, setUploadedCoverPictureUrl] = useState<any>();
  const [loggedInUser, setLoggedInUser] = useState<any>();

  const [createPageLoader, setCreatePageLoader] = useState<boolean>();
  const [savePageLoader, setSavePageLoader] = useState<boolean>();
  const [profilePictureLoader, setProfilePictureLoader] = useState<boolean>(false);
  const [coverPictureLoader, setCoverPictureLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    control,

    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: pageData?.title,
      type: +pageData?.type,
      desciption: pageData?.desciption
    }
  });
  const watchAllFields = watch();
  const dispatch = useDispatch();
  const { toggle } = useContext(ThemeContext);

  const userData = localStorage.getItem('userData');
  // to get logged in user data
  useEffect(() => {
    if (typeof userData === 'string') {
      setLoggedInUser(JSON.parse(userData));
    }
  }, [userData]);

  // uploading profile picture, on upload of image
  useEffect(() => {
    if (uploadedProfilePicture.length !== 0) {
      setProfilePictureLoader(true);
      dispatch(uploadMedia(uploadedProfilePicture[0], 'main-photo'))
        .then((res) => {
          if (res) {
            setUploadedProfilePictureUrl(res);
          } else {
            setUploadedProfilePictureUrl(null);
          }
          setProfilePictureLoader(false);
        })
        .catch((errors) => {
          setProfilePictureLoader(false);
        });
    }
  }, [dispatch, uploadedProfilePicture]);

  // uploading cover picture, on upload of image
  useEffect(() => {
    if (uploadedCoverPicture.length !== 0) {
      setCoverPictureLoader(true);
      dispatch(uploadMedia(uploadedCoverPicture[0], 'photos'))
        .then((res) => {
          if (res) {
            setUploadedCoverPictureUrl(res);
          } else {
            setUploadedCoverPictureUrl(null);
          }
          setCoverPictureLoader(false);
        })
        .catch((errors) => {
          setCoverPictureLoader(false);
        });
    }
  }, [dispatch, uploadedCoverPicture]);

  // setting cover and profile picture if editing page
  useEffect(() => {
    if (pageData?.profile_picture) {
      setUploadedProfilePictureUrl(pageData?.profile_picture);
    } else {
      setUploadedProfilePictureUrl(null);
    }
    if (pageData?.cover_picture) {
      setUploadedCoverPictureUrl(pageData?.cover_picture);
    } else {
      setUploadedCoverPictureUrl(null);
    }
    if (pageData?.id) {
      setIsPageCreated(true);
    }
  }, [pageData]);

  const handleCreatePage = (data: any) => {
    console.log('page created', {
      ...data,
      profile_picture: uploadedProfilePictureUrl,
      cover_picture: uploadedCoverPictureUrl
    });
    const payload = {
      ...data,
      profile_picture: uploadedProfilePictureUrl,
      cover_picture: uploadedCoverPictureUrl,
      user: loggedInUser.id
    };
    if (loggedInUser?.id) {
      if (isPageCreated && pageData?.id) {
        // update page
        setSavePageLoader(true);
        dispatch(updatePage(pageData?.id, payload))
          .then((res) => {
            if (res) {
              setSavePageLoader(false);
              navigate(`/${pageData?.page_name}`);
            } else {
              setSavePageLoader(false);
            }
          })
          .catch((errors) => {
            setSavePageLoader(false);
          });
      } else {
        // create page
        setCreatePageLoader(true);
        dispatch(createPage({ ...payload, subscribe_amount: 4.99 }))
          .then((res) => {
            if (res) {
              setIsPageCreated(true);
            } else {
              setIsPageCreated(false);
            }
            setCreatePageLoader(false);
          })
          .catch((errors) => {
            setCreatePageLoader(false);
          });
      }
    }
  };

  const navigateOnEditPage = () => {
    navigate(`/${pageData?.page_name}`);
  };

  // @ts-ignore
  return (
    <Stack
      direction="row"
      className="create-page-container"
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        borderBottom: `1px solid ${theme.palette.grey[700]}`
      }}
    >
      {/* left side create section */}
      <form
        style={{ width: window.innerWidth < 1000 ? '100%' : '30%' }}
        onSubmit={handleSubmit(handleCreatePage)}
        className="left-side-panel"
        autoComplete="off"
      >
        {/* header */}
        <Stack direction="row" justifyContent="space-between" className="header-container">
          <Stack>
            {/* navigation text */}
            <Stack className="secondary-text-color" direction="row" spacing={0.5}>
              <Typography
                variant="body2"
                className="cursor-pointer"
                component="div"
                onClick={navigateOnEditPage}
                sx={{
                  '&:hover': {
                    color: '#fff'
                  }
                }}
              >
                Page
              </Typography>
              <Typography variant="body2">{'>'}</Typography>
              <Typography variant="body2" className="cursor-pointer">
                {isPageCreated ? 'Set up your Page' : 'Create a Page'}
              </Typography>
            </Stack>
            <Typography className="primary-text-color" variant="h3">
              {isPageCreated ? 'Set up your Page' : 'Create a Page'}
            </Typography>
          </Stack>
          <IconButton>
            <HiInformationCircle />
          </IconButton>
        </Stack>
        {/* body */}
        <Stack direction="column" spacing={2} className="body-container">
          <Typography className="primary-text-color">Page Information</Typography>
          <Stack spacing={0.5}>
            <TextField
              placeholder="Page name (required)"
              {...register('title', { required: 'Please enter page name !' })}
              helperText={errors.title?.message as string}
              error={!!errors?.title}
              sx={{
                '& .MuiInputBase-input': {
                  color: toggle ? 'white' : '#161C24',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                },
              }}
            />
            <Typography variant="caption" className="secondary-text-color">
              Use the name of your business, brand or organisation, or a name that explains what the
              Page is about.
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Controller
              name="type"
              control={control}
              rules={{
                required: 'Please select category!'
              }}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    {...field}
                    value={
                      field.value
                        ? categoriesConfigObject.find((option) => option.value === field.value)
                        : null
                    }
                    // sx={{
                    //   '& .MuiAutocomplete-root': {
                    //     backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    //   }
                    // }}
                    options={categoriesConfigObject}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Choose a category"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          '& .MuiInputBase-input': {
                            color: toggle ? 'white' : '#161C24',
                          },
                          '& .MuiInputBase-root': {
                            backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                          },
                        }}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data?.value)}
                  />
                );
              }}
            />
            <Typography variant="caption" className="secondary-text-color">
              Enter a category that describes what type of business, organisation or topic the Page
              represents.
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <TextField
              placeholder="Enter Description About a Page"
              InputProps={{
                inputComponent: TextareaAutosize,
                minRows: 5
              }}
              {...register('desciption')}
              sx={{
                '& .MuiInputBase-input': {
                  color: toggle ? 'white' : '#161C24',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                },
              }}
            />
            <Typography variant="caption" className="secondary-text-color">
              Write about what your business does, the services that you provide or the purpose of
              the Page.
            </Typography>
          </Stack>
          {isPageCreated ? (
            <>
              <Typography className="primary-text-color">Images</Typography>
              <Stack spacing={0.5}>
                <Typography variant="caption" className="secondary-text-color fw-bold">
                  Profile Photo (Optional)
                </Typography>
                <CoverProfileDropzone
                  previewUrl={uploadedProfilePictureUrl}
                  loading={profilePictureLoader}
                  title="Add Profile Picture"
                  setUploadedImage={setUploadedProfilePicture}
                  setUploadedImageUrl={setUploadedProfilePictureUrl}
                />
                <Typography variant="caption" className="secondary-text-color">
                  Use a logo or image that helps people identify this Page in search results.
                </Typography>
              </Stack>
              <Stack spacing={0.5}>
                <Typography variant="caption" className="secondary-text-color fw-bold">
                  Cover Photo (Optional)
                </Typography>
                <CoverProfileDropzone
                  previewUrl={uploadedCoverPictureUrl}
                  loading={coverPictureLoader}
                  title="Add Cover Photo"
                  setUploadedImage={setUploadedCoverPicture}
                  setUploadedImageUrl={setUploadedCoverPictureUrl}
                />
                <Typography variant="caption" className="secondary-text-color">
                  Use an image that represents what this Page is about.
                </Typography>
              </Stack>
            </>
          ) : null}
        </Stack>
        {/* footer */}
        <Stack spacing={0.5} className="footer-container">
          {!isPageCreated ? (
            <Typography variant="caption" className="secondary-text-color">
              You can add images, contact info and other details after you create the Page.
            </Typography>
          ) : null}
          <LoadingButton
            loadingPosition="start"
            loading={createPageLoader || savePageLoader}
            variant="contained"
            type="submit"
            disabled={profilePictureLoader || coverPictureLoader}
          >
            {isPageCreated ? 'Save' : 'Create Page'}
          </LoadingButton>
        </Stack>
      </form>

      {/* right side preview section */}
      <Box
        className="right-side-preview-container"
        sx={window.innerWidth < 1000 ? { display: 'none !important' } : {}}
      >
        <Box className="preview-section" style={{ backgroundColor: toggle ? '#161C24' : '#FFFFFF' }}>
          {/* preview header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="preview-header"
          >
            <Typography className="primary-text-color">Preview</Typography>
          </Stack>
          {/* preview body */}
          <Stack direction="column" className="preview-body">
            {/* page-profile-section */}
            <Box className="page-profile-section" style={{backgroundColor: toggle ? '#161C24' : '#FFFFFF'}}>
              <Box
                className="cover-photo-container full-image-container"
                sx={{
                  backgroundImage: `url(${uploadedCoverPictureUrl || coverPhoto})`
                }}
              />

              <Grid container sx={{ p: 1 }}>
                <Grid item sm={12} md={4} lg={2}>
                  <Avatar
                    sx={{ width: 88, height: 88, mt: -2.5 }}
                    src={uploadedProfilePictureUrl}
                  />
                </Grid>
                <Grid item sm={12} md={8} lg={9}>
                  <Stack direction="column">
                    <Typography variant="h2" className="primary-text-color">
                      {watchAllFields.title || 'Page name'}
                    </Typography>
                    <Typography variant="body1" className="secondary-text-color">
                      {watchAllFields.type
                        ? categoriesConfigObject.find(
                            (option) => option.value === watchAllFields.type
                          )?.label
                        : 'Category'}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              {/* Description */}
              <Stack direction="column" sx={{ p: 1 }}>
                <TogglingText
                  text={watchAllFields.desciption || 'Description ....'}
                  thresoldLength={85}
                />
              </Stack>

              <Divider />
              {/* Tabs */}
              <Stack direction="row" justifyContent="flex-start">
                <Tabs variant="fullWidth" value={0}>
                  <Tab label="Video Posts (0)" />
                </Tabs>
              </Stack>
            </Box>

            {/* Tabs body container */}
            <Box className="tab-body">
              <Stack
                className="secondary-text-color"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                Nothing to show
              </Stack>
              {/* <Grid container spacing={2}>
                <Grid item sm={12} md={5} lg={5}>
                  <Card className="info-cards">
                    <Stack className="card-header">
                      <Typography component="span">About</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <HiInformationCircle />
                      <Typography variant="body2" className="text-break">
                        {watchAllFields.description || 'Description ...'}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item sm={12} md={7} lg={7}>
                  <Card className="info-cards">
                    <Stack className="card-header" direction="row" alignItems="center" spacing={1}>
                      <Avatar />
                      <Button variant="contained" fullWidth>
                        Create Post
                      </Button>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} lg={4}>
                        <Typography variant="body2">Photo/video</Typography>
                      </Grid>
                      <Grid item sm={12} md={4} lg={4}>
                        <Typography variant="body2">Tag people</Typography>
                      </Grid>
                      <Grid item sm={12} md={4} lg={4}>
                        <Typography variant="body2">Check In</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid> */}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default CreatePage;
