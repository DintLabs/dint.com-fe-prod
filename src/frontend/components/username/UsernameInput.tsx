import { FormControl, InputAdornment, TextField, useTheme } from '@mui/material';
import _axios from 'frontend/api/axios';
import useUser from 'frontend/hooks/useUser';

import React, { useContext } from 'react';
import { Control, Controller, FieldValues, FormState, UseFormWatch } from 'react-hook-form';
import { BsCheckLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { ThemeContext } from '../../contexts/ThemeContext';

interface UsernameInputProps {
  setIsUniqueUsername: React.Dispatch<React.SetStateAction<boolean>>;
  isUniqueUsername: boolean;
  formState: FormState<FieldValues>;
  control: Control<FieldValues, any>;
  watch: UseFormWatch<FieldValues>;
}

const UsernameInput = ({
  setIsUniqueUsername,
  isUniqueUsername,
  formState,
  control,
  watch
}: UsernameInputProps) => {
  const theme = useTheme();
  const userHook = useUser();

  const user = userHook.reduxUser;
  const { toggle } = useContext(ThemeContext);

  const checkUnique = async (username: string) => {
    if (user && username === user.custom_username) {
      setIsUniqueUsername(true);
      return;
    }

    try {
      const { data } = await _axios.post('/api/user/get-profile-by-username/', {
        custom_username: username,
      });

      if (data.code === 200) {
        setIsUniqueUsername(false);
      } else {
        setIsUniqueUsername(true);
      }
    } catch (err) {
      console.error(err);

      setIsUniqueUsername(true);
    }
  };

  const customUsername = watch('custom_username');

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name="custom_username"
        rules={{
          required: true,
          validate: () => isUniqueUsername,
          pattern: /^[a-z0-9\-_$]{3,30}$/,
        }}
        defaultValue={user?.custom_username || ''}
        render={({ field: { onChange, value = '', ref } }: any) => (
          <TextField
            error={!isUniqueUsername || !!formState.errors?.custom_username}
            inputRef={ref}
            value={value}
            label="Username"
            variant="filled"
            onChange={(e: any) => {
              const username = e.target.value?.toLowerCase();

              onChange(username);
              checkUnique(username);
            }}
            sx={{
              flex: 1,
              '& .MuiFormHelperText-root': {
                color: theme.palette.grey[600],
                marginLeft: 0
              },
              '& .MuiFilledInput-input': {
                color: toggle ? 'white' : '#161C24',
              },
              '& .MuiInputBase-root': {
                backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
              },
              '& .MuiInputBase-root:hover, .MuiInputBase-root:focus': {
                backgroundColor: ''
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {isUniqueUsername ? <BsCheckLg color="green" /> : <ImCross color="red" />}
                </InputAdornment>
              )
            }}
            helperText={`https://dint.com/${customUsername || user?.custom_username || ''}`}
          />
        )}
      />
    </FormControl>
  );
};

export default UsernameInput;
