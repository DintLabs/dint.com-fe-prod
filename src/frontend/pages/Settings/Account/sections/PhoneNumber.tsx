import * as React from 'react';

import { Button, Stack, Grid } from '@mui/material';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import styled from 'styled-components';

import Submenu from 'frontend/components/submenu';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import {  useSelector } from 'react-redux';
import { RootState } from 'frontend/redux/store';
// import { setUserData } from 'frontend/redux/slices/user';
import { useForm } from 'react-hook-form';

import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';

const InpPhone = styled(PhoneInput)`
  .special-label {
    background: transparent;
    backdrop-filter: blur(1px);
    border-radius: 4px;
    color: silver;
  }
  .form-control {
    background: transparent;
    color: silver;
  }
`;

const PhoneNumber = () => {
  const { userData } = useSelector((state: RootState) => state.user);

  const [state, setState] = React.useState(userData?.phone_no?.length!=0? userData?.phone_no : '+1');

  const { handleSubmit } = useForm();

  React.useEffect(() => {
      setState(userData?.phone_no?.length!=0? userData?.phone_no :"+1")
  }, [userData])

  const handleOnChange = (e: any) => {
    setState(e)
  };

  const onSubmit = async (data: any) => {
    const id = toast.loading('Loading...');
    try {
      _axios.put('api/user/update-profile-by-token/',{
        phone_no: state
      });

      setTimeout(() => {
        toast.update(id, {
          render: 'Phone Number Updated Successful!',
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

  const { toggle } = useContext(ThemeContext);

  return (
    <Grid container>
      <Submenu title="PHONE NUMBER" username="" routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <InpPhone country="us" value={state} onChange={handleOnChange} />
      </GridWithBoxConteiner>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          width: '100%',
          margin: '10px',
          padding: '10px 0 0 0'
        }}
      >
        <Button variant="outlined">CANCEL</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">SAVE</Button>
      </Stack>
    </Grid>
  );
};

export default PhoneNumber;
