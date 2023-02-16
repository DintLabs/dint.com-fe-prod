import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'frontend/redux/store';
import { Switch, Typography, Grid, CircularProgress } from '@mui/material';
import _axios from 'frontend/api/axios';
import Submenu from 'frontend/components/submenu';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { toast } from 'react-toastify';
import { fetchUserData } from 'frontend/redux/slices/user';
import { ThemeContext } from '../../../contexts/ThemeContext';

const PrivacyAndSafety = () => {
  // MUI component need state
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoadingPrivacyStatus, setIsLoadingPrivacyStatus] = useState(false);
  const [isProfileEnable, setIsProfileEnable] = useState(false);
  const [isLoadingProfileEnable, setIsLoadingProfileEnable] = useState(false);

  const { userData } = useSelector((store: RootState) => store.user);
  const { toggle } = useContext(ThemeContext);

  useEffect(() => {
    if (userData) {
      setIsPrivate(!!userData.is_private);
      setIsProfileEnable(!!userData.able_to_be_found);
    }
  }, [userData]);

  const onChangeProfilePrivacyStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingPrivacyStatus(true);
    const result = await _axios.put('api/connection/update-privacy-status/', {});

    if (result?.data?.code === 200) {
      toast.success(result?.data?.message || 'Success!');
      setIsPrivate(!isPrivate);
      fetchUserData();
    }

    setIsLoadingPrivacyStatus(false);
  };

  const onChangeEnableProfileStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let params = {
      able_to_be_found: !isProfileEnable
    }
    setIsLoadingProfileEnable(true);
    const result = await _axios.put('api/user/update-profile-by-token/', params);

    if (result?.data?.code === 200) {
      toast.success(result?.data?.message || 'Success!');
      setIsProfileEnable(!isProfileEnable);
      fetchUserData();
    }

    setIsLoadingProfileEnable(false);
  };

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="PRIVACY AND SAFETY" username="Profile" routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <FlexRow ai="center">
          <Typography
            className="primary-text-color"
            variant="subtitle2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'spase-between',
              gap: '10px',
              minWidth: '60px'
            }}
          >
            {isLoadingPrivacyStatus ? (
              <FlexRow w="58px">
                <CircularProgress color="primary" size={38} />
              </FlexRow>
            ) : (
              <Switch
                checked={isPrivate}
                onChange={onChangeProfilePrivacyStatus}
                color="primary"
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: toggle ? '#fff' : 'black'
                  }
                }}
              />
            )}
            Private Account
          </Typography>
        </FlexRow>
      </GridWithBoxConteiner>
      <GridWithBoxConteiner>
        <FlexRow ai="center">
          <Typography
            className="primary-text-color"
            variant="subtitle2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'spase-between',
              gap: '10px',
              minWidth: '60px'
            }}
          >
            {isLoadingProfileEnable ? (
              <FlexRow w="58px">
                <CircularProgress color="primary" size={38} />
              </FlexRow>
            ) : (
              <Switch
                checked={isProfileEnable}
                onChange={onChangeEnableProfileStatus}
                color="primary"
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: toggle ? '#fff' : 'black'
                  }
                }}
              />
            )}
            Enable your profile to be easily found.
          </Typography>
        </FlexRow>
      </GridWithBoxConteiner>
    </Grid>
  );
};

export default PrivacyAndSafety;
