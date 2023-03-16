import {
  Button as MUIButton,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import _axios from 'frontend/api/axios';
import useAuth from 'frontend/hooks/useAuth';
import useUser from 'frontend/hooks/useUser';
import { fetchUserData } from 'frontend/redux/slices/user';
import { AppDispatch } from 'frontend/redux/store';
import { uploadMedia } from 'frontend/services/mediaService';
import { UploadProfilePicture } from 'frontend/services/profileService';
import { AuthUser } from 'frontend/types/authentication';
import * as React from 'react';
import { Button, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import '../../material/Profile.css';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userHook = useUser();
  const user = userHook.reduxUser;

  const { updateProfile, changePassword } = useAuth();

  const [passErr, setPassErr] = React.useState('');
  const [objUser, setObjUser] = React.useState<AuthUser>({});

  const [image, setImage] = React.useState('');
  const [file, setFile] = React.useState<React.SetStateAction<string>>('');
  const [isLoadingPrivacyStatus, setIsLoadingPrivacyStatus] = React.useState(false);

  const fetchUserDataFn = React.useCallback(async () => {
    dispatch(fetchUserData());

    setObjUser(user);
  }, [dispatch, user]);

  React.useEffect(() => {
    if (!user) {
      fetchUserDataFn();
    }
  }, [fetchUserDataFn, user]);

  const [updatePasswordState, setObjUpdatePassword] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const onChangeUserInfo = (updatedInfo: Partial<AuthUser>) => {
    setObjUser({ ...objUser, ...updatedInfo });
  };

  const onPasswordStateChange = (updatedInfo: any) => {
    setObjUpdatePassword({ ...updatePasswordState, ...updatedInfo });
  };

  // function for updating password
  const passwordUpdate = async () => {
    if (
      updatePasswordState.currentPassword === '' ||
      updatePasswordState.newPassword === '' ||
      updatePasswordState.confirmNewPassword === ''
    ) {
      return setPassErr('Fill All Fields');
    }
    if (updatePasswordState.currentPassword === updatePasswordState.newPassword) {
      return setPassErr('Cannot set current Password to New Password');
    }
    if (updatePasswordState.newPassword !== updatePasswordState.confirmNewPassword) {
      console.log('password and confirm password is not matching');
      return setPassErr('Password and Confirm Password Not Matching');
    }

    try {
      await changePassword(
        updatePasswordState.currentPassword,
        updatePasswordState.confirmNewPassword
      );
      Swal.fire({
        title: 'Success',
        text: 'Your Password Is Updated Successfully',
        icon: 'success',
        confirmButtonText: 'Close'
      });
      setPassErr('');
    } catch (ex: any) {
      if (ex.code === 'auth/user-not-found') {
        setPassErr('User Not Found');
      } else if (ex.code === 'auth/wrong-password') {
        setPassErr('Wrong Current Password');
      } else if (ex.code) {
        setPassErr('Something Went Wrong');
      } else {
        setPassErr(ex);
      }
      console.error(ex);
    }
    return null;
  };

  // function of updating user's profile information
  const informationUpdate = async () => {
    try {
      await updateProfile({ ...objUser });
      const id = toast.loading('Loading...', {
        autoClose: 6000
      });

      try {
        if (image.length > 0 && file) {
          const uploadResult = await uploadMedia(file,'main-photo');
          toast.update(id, {
            render: 'Image Uploaded',
            type: 'success',
            isLoading: false
          });
          saveData(id, {
            ...objUser,
            profile_image: uploadResult?.data?.data?.data[0]?.media_file_url || ''
          });
        } else {
          saveData(id, objUser);
        }
      } catch (err: any) {
        toast.dismiss();
        toast.error(err);
      }
    } catch (e: any) {
      console.error(e);
      toast.dismiss();
    }
  };

  const saveData = async (id: any, data: any) => {
    const result = await _axios.put('api/user/update-profile-by-token/', data);
    if (result.data.data) {
      // const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
      // localStorage.setItem('userData', JSON.stringify({ ...savedUser, ...result.data.data }));
      userHook.setCurrentUser({ ...userHook.reduxUser, ...result.data.data });
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
  };

  const handleFileChange = (e: any) => {
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
  

  const onChangeProfilePrivacyStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingPrivacyStatus(true);

    const result = await _axios.put('api/connection/update-privacy-status/', {});

    if (result?.data?.code === 200) {
      toast.success(result?.data?.message || 'Success!');
      await fetchUserDataFn();
      setIsLoadingPrivacyStatus(false);
    } else {
      setIsLoadingPrivacyStatus(false);
    }
  };

  return (
    <>
      <div className="profile_form_parent">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="home" title="Wallets">
            <div className="wallet_info_div">
              <h5>Wallets are Coming Soon</h5>
            </div>
          </Tab>

          <Tab eventKey="profile" title="Personal">
            <div className="profile_form_div">
              <div className="profile_div_child">
                <FormGroup style={{ marginBottom: 10 }}>
                  <FormControlLabel
                    control={
                      isLoadingPrivacyStatus ? (
                        <CircularProgress color="primary" style={{ marginRight: 10 }} />
                      ) : (
                        <Checkbox
                          checked={!user?.is_private}
                          onChange={onChangeProfilePrivacyStatus}
                        />
                      )
                    }
                    label="Make your profile public"
                  />
                </FormGroup>

                <h5>Edit Personal Information</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={objUser?.display_name || user?.display_name || ''}
                      onChange={(e: any) => {
                        onChangeUserInfo({ display_name: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="User Name"
                        value={objUser?.custom_username || user?.custom_username || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChangeUserInfo({ custom_username: e.target.value });
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={objUser?.bio || user?.bio || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeUserInfo({ bio: e.target.value });
                      }}
                      placeholder="Biography"
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.city || user?.city || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeUserInfo({ city: e.target.value });
                      }}
                      placeholder="city"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Twitter</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.twitter || user?.twitter || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeUserInfo({ twitter: e.target.value });
                      }}
                      placeholder="URL"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.instagram || user?.instagram || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeUserInfo({ instagram: e.target.value });
                      }}
                      id="instaLink"
                      placeholder="URL"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Discord</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.discord || user?.discord || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeUserInfo({ discord: e.target.value });
                      }}
                      id="discordLink"
                      placeholder="URL"
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={informationUpdate}>
                    Save
                  </Button>
                </Form>
              </div>
              <div className="profile_div_child profile_img_div d-flex align-items-center justify-content-center flex-column">
                <div id="edit_image_print">
                  <img
                    id="profile_image_edit"
                    alt="profile_image_edit"
                    src={user?.profile_image}
                   
                  />
                </div>
                <MUIButton variant="contained" component="label">
                  <input
                    hidden
                    accept="video/*,image/*"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                  />
                  Select Image
                </MUIButton>
              </div>
            </div>
          </Tab>

          <Tab eventKey="account" title="Account">
            <div className="forgot_password_div">
              <h5>Change Your Password</h5>
              <Form style={{ marginTop: '25px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Current Password"
                    value={updatePasswordState.currentPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onPasswordStateChange({ currentPassword: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={updatePasswordState.newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onPasswordStateChange({ newPassword: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={updatePasswordState.confirmNewPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onPasswordStateChange({ confirmNewPassword: e.target.value });
                    }}
                  />
                </Form.Group>

                <Button variant="primary" onClick={passwordUpdate}>
                  Save
                </Button>
                <p style={{ color: 'red', marginTop: '20px' }}>{passErr}</p>
              </Form>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
