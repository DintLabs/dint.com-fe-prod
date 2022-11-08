import { Button, Grid, Stack } from '@mui/material';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import Submenu from 'frontend/components/submenu';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';

import UsernameInput from 'frontend/components/username/UsernameInput';
import useUser from 'frontend/hooks/useUser';

const Username = () => {
  const userHook = useUser();

  const { handleSubmit, formState, watch, control, setValue } = useForm();

  const [isUniqueUsername, setIsUniqueUsername] = useState<boolean>(true);

  const onSubmit = async (data: any) => {
    const id = toast.loading('Loading...');
    try {
      const result = await _axios.put('api/user/update-profile-by-token/', data);
      if (result.data.data) {
        userHook.setCurrentUser({ ...userHook.reduxUser, ...result.data.data });

        setValue('custom_username', result?.data?.data?.custom_username || '');
        setValue('display_name', result?.data?.data?.display_name || '');
        setValue('bio', result?.data?.data?.bio || '');
        setValue('city', result?.data?.data?.city || '');
        setValue('twitter', result?.data?.data?.twitter || '');
        setValue('instagram', result?.data?.data?.instagram || '');
        setValue('discord', result?.data?.data?.discord || '');
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

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="CHANGE USERNAME" username="" routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <UsernameInput
          setIsUniqueUsername={setIsUniqueUsername}
          isUniqueUsername={isUniqueUsername}
          formState={formState}
          control={control}
          watch={watch}
        />
      </GridWithBoxConteiner>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ width: '100%', margin: '10px' }}
      >
        <Button variant="outlined" sx={{ width: '100%' }} onClick={handleSubmit(onSubmit)}>
          SAVE
        </Button>
      </Stack>
    </Grid>
  );
};

export default Username;
